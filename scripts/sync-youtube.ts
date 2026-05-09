import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import fs from "fs";

const prisma = new PrismaClient();
const CHANNEL_URL = "https://www.youtube.com/@physicsedupoint/playlists";

async function main() {
  console.log("🚀 Starting YouTube Playlist Sync...");

  // 1. Fetch Playlists
  console.log("📡 Fetching playlists from channel...");
  execSync(`python -m yt_dlp --flat-playlist --dump-json "${CHANNEL_URL}" > raw_playlists.json`, { stdio: "inherit" });
  
  let playlistLines: string[] = [];
  try {
     playlistLines = fs.readFileSync("raw_playlists.json", "utf16le").split("\n").filter(Boolean);
     if (playlistLines.length > 0 && !playlistLines[0].includes("{")) {
       playlistLines = fs.readFileSync("raw_playlists.json", "utf8").split("\n").filter(Boolean);
     }
  } catch (e) {
     playlistLines = fs.readFileSync("raw_playlists.json", "utf8").split("\n").filter(Boolean);
  }
  
  const playlists = playlistLines.map(l => {
    try {
      const j = JSON.parse(l);
      return { id: j.id, title: j.title };
    } catch { return null; }
  }).filter(Boolean) as { id: string, title: string }[];

  console.log(`✅ Found ${playlists.length} playlists.`);
  
  // Clear existing subjects to make way for new courses
  console.log("🧹 Clearing old subjects...");
  await prisma.video.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.subject.deleteMany({});

  // Let's only process the first 6 playlists to avoid extremely long sync times
  const selectedPlaylists = playlists.slice(0, 6);

  for (let i = 0; i < selectedPlaylists.length; i++) {
    const pl = selectedPlaylists[i];
    console.log(`\n📚 Processing Course (Playlist): ${pl.title}`);
    
    // Create Subject
    const subjectSlug = pl.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const subject = await prisma.subject.create({
      data: {
        name: pl.title,
        slug: subjectSlug,
        description: `Complete course for ${pl.title}`,
        icon: "🎓",
        color: "#1a237e",
        order: i,
      }
    });

    // Create a single default chapter
    const chapter = await prisma.chapter.create({
      data: {
        title: "All Lectures",
        order: 0,
        subjectId: subject.id,
      }
    });

    // Fetch videos for this playlist
    console.log(`   📡 Fetching videos for ${pl.id}...`);
    execSync(`python -m yt_dlp --flat-playlist --dump-json "https://www.youtube.com/playlist?list=${pl.id}" > raw_videos_${pl.id}.json`, { stdio: "inherit" });
    
    // Read videos
    // yt-dlp on Windows might output utf16le or utf8 depending on terminal, let's try reading as buffer
    let videoLines: string[] = [];
    try {
       videoLines = fs.readFileSync(`raw_videos_${pl.id}.json`, "utf16le").split("\n").filter(Boolean);
       if (videoLines.length > 0 && !videoLines[0].includes("{")) {
         // Fallback to utf8 if utf16le didn't work properly
         videoLines = fs.readFileSync(`raw_videos_${pl.id}.json`, "utf8").split("\n").filter(Boolean);
       }
    } catch (e) {
       videoLines = fs.readFileSync(`raw_videos_${pl.id}.json`, "utf8").split("\n").filter(Boolean);
    }
    
    const videos = videoLines.map(l => {
      try {
        const j = JSON.parse(l);
        return { id: j.id, title: j.title, duration: j.duration };
      } catch { return null; }
    }).filter(Boolean) as { id: string, title: string, duration?: number }[];

    console.log(`   ✅ Found ${videos.length} videos.`);

    // Insert videos
    for (let v = 0; v < videos.length; v++) {
      const vid = videos[v];
      if (!vid.id) continue;
      
      const durationStr = vid.duration ? `${Math.floor(vid.duration / 60)}:${(vid.duration % 60).toString().padStart(2, '0')}` : "0:00";
      
      await prisma.video.create({
        data: {
          title: vid.title || "Untitled Lecture",
          youtubeId: vid.id,
          duration: durationStr,
          order: v,
          isFeatured: v === 0 && i === 0,
          chapterId: chapter.id,
        }
      });
    }
    
    // Cleanup temp file
    try { fs.unlinkSync(`raw_videos_${pl.id}.json`); } catch {}
  }
  
  try { fs.unlinkSync("raw_playlists.json"); } catch {}

  console.log("\n🎉 All playlists and videos synced successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
