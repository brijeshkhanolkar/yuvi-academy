import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const subjects = [
  {
    name: "Physics",
    slug: "physics",
    description: "Master mechanics, thermodynamics, electromagnetism, optics & modern physics",
    icon: "⚛️",
    color: "#1a237e",
    bgGradient: "from-blue-900 to-indigo-700",
    order: 1,
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    description: "Explore organic, inorganic & physical chemistry with expert guidance",
    icon: "🧪",
    color: "#1b5e20",
    bgGradient: "from-green-900 to-emerald-700",
    order: 2,
  },
  {
    name: "Mathematics",
    slug: "mathematics",
    description: "Build strong foundations in algebra, calculus, geometry & statistics",
    icon: "📐",
    color: "#e65100",
    bgGradient: "from-orange-900 to-amber-700",
    order: 3,
  },
  {
    name: "Biology",
    slug: "biology",
    description: "Understand cell biology, genetics, ecology & human physiology",
    icon: "🧬",
    color: "#880e4f",
    bgGradient: "from-pink-900 to-rose-700",
    order: 4,
  },
  {
    name: "Robotics",
    slug: "robotics",
    description: "Learn programming, electronics, AI & mechanical design for robotics",
    icon: "🤖",
    color: "#4a148c",
    bgGradient: "from-purple-900 to-violet-700",
    order: 5,
  },
  {
    name: "Olympiad Prep",
    slug: "olympiad",
    description: "National & international olympiad coaching for top performers",
    icon: "🏆",
    color: "#b71c1c",
    bgGradient: "from-red-900 to-orange-700",
    order: 6,
  },
];

const chaptersData: Record<string, string[]> = {
  physics: [
    "Chapter 1: Units & Measurements",
    "Chapter 2: Motion in a Straight Line",
    "Chapter 3: Motion in a Plane",
    "Chapter 4: Laws of Motion",
    "Chapter 5: Work, Energy & Power",
    "Chapter 6: Gravitation",
    "Chapter 7: Thermodynamics",
    "Chapter 8: Waves & Oscillations",
    "Chapter 9: Electrostatics",
    "Chapter 10: Current Electricity",
    "Chapter 11: Magnetic Effects",
    "Chapter 12: Optics",
    "Chapter 13: Modern Physics",
  ],
  chemistry: [
    "Chapter 1: Some Basic Concepts",
    "Chapter 2: Atomic Structure",
    "Chapter 3: Chemical Bonding",
    "Chapter 4: States of Matter",
    "Chapter 5: Thermodynamics",
    "Chapter 6: Equilibrium",
    "Chapter 7: Organic Chemistry Basics",
    "Chapter 8: Hydrocarbons",
    "Chapter 9: Periodic Properties",
    "Chapter 10: Electrochemistry",
  ],
  mathematics: [
    "Chapter 1: Sets, Relations & Functions",
    "Chapter 2: Complex Numbers",
    "Chapter 3: Quadratic Equations",
    "Chapter 4: Permutations & Combinations",
    "Chapter 5: Binomial Theorem",
    "Chapter 6: Sequences & Series",
    "Chapter 7: Limits & Derivatives",
    "Chapter 8: Integral Calculus",
    "Chapter 9: Coordinate Geometry",
    "Chapter 10: 3D Geometry & Vectors",
    "Chapter 11: Statistics & Probability",
  ],
  biology: [
    "Chapter 1: Cell: The Unit of Life",
    "Chapter 2: Biomolecules",
    "Chapter 3: Cell Division",
    "Chapter 4: Photosynthesis",
    "Chapter 5: Respiration in Plants",
    "Chapter 6: Plant Physiology",
    "Chapter 7: Human Physiology",
    "Chapter 8: Genetics",
    "Chapter 9: Evolution",
    "Chapter 10: Ecology",
  ],
  robotics: [
    "Module 1: Introduction to Robotics",
    "Module 2: Electronics Fundamentals",
    "Module 3: Arduino Programming",
    "Module 4: Sensors & Actuators",
    "Module 5: Mechanical Design",
    "Module 6: AI in Robotics",
    "Module 7: Project Build",
  ],
  olympiad: [
    "Physics Olympiad: Mechanics",
    "Physics Olympiad: Electrodynamics",
    "Chemistry Olympiad: Organic",
    "Chemistry Olympiad: Physical",
    "Math Olympiad: Algebra",
    "Math Olympiad: Number Theory",
    "Biology Olympiad: Cell Biology",
    "Practice Papers & Mock Tests",
  ],
};

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPass = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@yuvigurukul.in" },
    update: {},
    create: {
      email: "admin@yuvigurukul.in",
      name: "Admin",
      password: adminPass,
      role: "admin",
      isActive: true,
    },
  });
  console.log("✅ Admin user created: admin@yuvigurukul.in / Admin@123");

  // Create demo student
  const studentPass = await bcrypt.hash("Student@123", 12);
  await prisma.user.upsert({
    where: { email: "demo@yuvigurukul.in" },
    update: {},
    create: {
      email: "demo@yuvigurukul.in",
      name: "Demo Student",
      password: studentPass,
      role: "student",
      isActive: true,
    },
  });
  console.log("✅ Demo student created: demo@yuvigurukul.in / Student@123");

  // Create subjects with chapters
  for (const subjectData of subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: subjectData.slug },
      update: {},
      create: subjectData,
    });

    const chapters = chaptersData[subjectData.slug] || [];
    for (let i = 0; i < chapters.length; i++) {
      await prisma.chapter.upsert({
        where: {
          id: `${subject.id}-ch-${i}`,
        },
        update: {},
        create: {
          id: `${subject.id}-ch-${i}`,
          title: chapters[i],
          order: i,
          subjectId: subject.id,
        },
      });
    }
    console.log(`✅ Subject: ${subject.name} with ${chapters.length} chapters`);
  }

  // Sample announcement
  await prisma.announcement.upsert({
    where: { id: "welcome-announcement" },
    update: {},
    create: {
      id: "welcome-announcement",
      title: "🎉 Welcome to Yuvi Gurukul!",
      content: "We are excited to launch our new digital learning platform. Explore all subjects, watch lectures, and start your journey to success today!",
      isActive: true,
    },
  });

  // Seed some dummy videos for the first few chapters of Physics and Chemistry
  console.log("🎥 Adding sample video content...");
  const dummyYoutubeIds = ["dQw4w9WgXcQ", "t5s1eG-UfI4", "V2P6-T5E3B0", "OIQ_3IuW35A", "F8hA8-P-g_0"];
  let videoCounter = 0;
  
  const physicsSubject = await prisma.subject.findUnique({ where: { slug: "physics" } });
  if (physicsSubject) {
    const chapters = await prisma.chapter.findMany({ where: { subjectId: physicsSubject.id } });
    for (const chapter of chapters.slice(0, 3)) { // Add to first 3 chapters
      for (let i = 0; i < 3; i++) {
        const vidId = `vid-${chapter.id}-${i}`;
        await prisma.video.upsert({
          where: { id: vidId },
          update: {},
          create: {
            id: vidId,
            title: `${chapter.title} - Lecture ${i + 1}`,
            description: `Detailed explanation of ${chapter.title}. This is a sample lecture from Physics Edupoint.`,
            youtubeId: dummyYoutubeIds[(videoCounter++) % dummyYoutubeIds.length],
            duration: `${Math.floor(Math.random() * 30 + 15)}:${Math.floor(Math.random() * 50 + 10)}`,
            order: i,
            isFeatured: i === 0 && chapter.order === 0,
            chapterId: chapter.id,
          }
        });
      }
    }
  }

  console.log("🎉 Database seeded successfully with content!");

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
