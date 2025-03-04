import React from "react";
import SocialPostCard from "../components/SocialPostCard";

export default function Home() {
  const samplePost = {
    imageUrl: "/sample-profile.jpg", // Replace with your image path
    title: "Breaking News",
    description:
      "కేడర్ ప్రాయి పరిశీలన పేపత్ అధ్యక్ష వేవత కార్యకర్తలు అనాయాయం చేయున్నారని,అత్తి కఠిన ప్రతి వేవత కుటుంబానికి సంబంధించిన సమాచారాన్ని,వేవత కార్యక్రమం తగ్గా ప్రధాన కార్యకర్తల గుండు వెంటకున్నరు ప్రభుత్వాన్ని డిమాండ్",
    timestamp: "24m ago",
    likes: 43,
    hashtags: ["Telangana", "MOTHKUR", "Tungathurthi"],
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <SocialPostCard {...samplePost} />
    </div>
  );
}
