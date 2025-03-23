export const topic = {
  id: Number.parseInt(params.id),
  title: "Welcome to our new forum platform!",
  content: `
      <p>Hello everyone!</p>
      <p>We're excited to launch our brand new forum platform. This space is designed for our community to connect, share ideas, and help each other.</p>
      <p>Here are some guidelines to keep in mind:</p>
      <ul>
        <li>Be respectful to other members</li>
        <li>Stay on topic in each category</li>
        <li>Share knowledge and help others when you can</li>
        <li>Report any issues or bugs you encounter</li>
      </ul>
      <p>We hope you enjoy the new platform and look forward to your contributions!</p>
    `,
  author: "Admin",
  avatar: "/placeholder.svg?height=40&width=40",
  category: "announcements",
  createdAt: "March 15, 2023",
  views: 1204,
  likes: 87,
  isPinned: true,
  isHot: true,
};

// Mock data for replies
export const replies = [
  {
    id: 1,
    content:
      "This is fantastic! I've been waiting for a new forum platform. The design looks clean and modern.",
    author: "TechEnthusiast",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "March 15, 2023",
    likes: 24,
    dislikes: 2,
  },
  {
    id: 2,
    content:
      "Great to see the new platform launched. Quick question - is there a mobile app planned for the future?",
    author: "MobileUser",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "March 16, 2023",
    likes: 15,
    dislikes: 0,
  },
  {
    id: 3,
    content:
      "I'm loving the dark mode theme! Makes it much easier on the eyes when browsing late at night.",
    author: "NightOwl",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "March 17, 2023",
    likes: 32,
    dislikes: 1,
  },
];
