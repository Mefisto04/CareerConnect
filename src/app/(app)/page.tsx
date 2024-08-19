// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Autoplay from 'embla-carousel-autoplay';
// import messages from '@/messages.json';

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

// export default function Home() {
//   return (
//     <>
//       {/* Main content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
//         <section className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold">
//             Accelerate your career
//           </h1>
//           <p className="mt-3 md:mt-4 text-base md:text-lg">
//             Carrer Comapny - We craft exceptional teams for visonary comapnies.
//           </p>
//         </section>

//         {/* Carousel for Messages */}
//         <Carousel
//           plugins={[Autoplay({ delay: 2000 })]}
//           className="w-full max-w-lg md:max-w-xl"
//         >
//           <CarouselContent>
//             {messages.map((message, index) => (
//               <CarouselItem key={index} className="p-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>{message.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
//                     <Mail className="flex-shrink-0" />
//                     <div>
//                       <p>{message.content}</p>
//                       <p className="text-xs text-muted-foreground">
//                         {message.received}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//       </main>

//       {/* Footer */}
//       <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
//         © 2024 Career Connect. All rights reserved.
//       </footer>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

type Message = {
  title: string;
  content: string;
  received: string;
};

export default function Home() {
  const { data: session } = useSession();
  const user: User = session?.user;
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f0f0f0] text-[#333]">
      {/* Header */}
      {/* <header className="px-4 lg:px-6 h-14 flex items-center bg-[#5e0797] text-white p-8">
        <Link
          href="/"
          className="flex gap-4 items-center justify-center"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <a href="#" className="text-xl font-bold mb-4 md:mb-0">
            Carrer Company
          </a>
        </Link>
        <nav className="ml-auto flex justify-center items-center gap-8 sm:gap-8">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Mentors
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
          {session ? (
          <>
            <span className="mr-4 text-xl">
              Welcome, {user.username || user.email}
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
        </nav>
      </header> */}

      {/* Main content */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#5e0797] text-white">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
                Unlock Your Career Potential with Mentor Connect
              </h1>
              <p className="max-w-[600px] text-white md:text-xl">
                Connect with experienced mentors across various industries and
                receive personalized guidance to accelerate your career growth.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white text-[#5e0797] px-8 text-sm font-medium shadow transition-colors hover:bg-[#f0f0f0] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Book a Meeting
              </Link>
            </div>

            {/* Carousel for Messages */}
            {/* <Carousel
              plugins={[Autoplay({ delay: 2000 })]}
              className="w-full max-w-lg md:max-w-xl"
            >
              <CarouselContent>
                {messages.map((message: Message, index: number) => (
                  <CarouselItem key={index} className="p-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{message.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                        <Mail className="flex-shrink-0" />
                        <div>
                          <p>{message.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {message.received}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
             */}
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center rounded-lg bg-[#f0f0f0] p-4 text-center">
                  <BriefcaseIcon className="mx-auto h-8 w-8 text-[#5e0797]" />
                  <h3 className="mt-2 text-lg font-medium text-[#5e0797]">
                    Career Coaching
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center rounded-lg bg-[#f0f0f0] p-4 text-center">
                  <LightbulbIcon className="mx-auto h-8 w-8 text-[#5e0797]" />
                  <h3 className="mt-2 text-lg font-medium text-[#5e0797]">
                    Entrepreneurship
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center rounded-lg bg-[#f0f0f0] p-4 text-center">
                  <CodeIcon className="mx-auto h-8 w-8 text-[#5e0797]" />
                  <h3 className="mt-2 text-lg font-medium text-[#5e0797]">
                    Tech & Engineering
                  </h3>
                </div>
                <div className="flex flex-col justify-center items-center rounded-lg bg-[#f0f0f0] p-4 text-center">
                  <BriefcaseIcon className="mx-auto h-8 w-8 text-[#5e0797]" />
                  <h3 className="mt-2 text-lg font-medium text-[#5e0797]">
                    Business Strategy
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f0f0]">
          <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Find the Right Mentor for Your Career
              </h2>
              <p className="max-w-[600px] text-[#333] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our diverse pool of experienced mentors and connect with
                the one who can best guide you towards your career goals.
              </p>
              <Link
                href="/sign-in"
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#5e0797] text-white px-8 text-sm font-medium shadow transition-colors hover:bg-[#8257c5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                View Mentors
              </Link>
            </div>
            {/* Mentor Cards */}
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <MentorCard
                  name="John Doe"
                  role="Career Coach"
                  description="10+ years of experience helping professionals advance their careers."
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="JD"
                />
                <MentorCard
                  name="Sarah Anderson"
                  role="Entrepreneurship Mentor"
                  description="Founder of a successful startup, passionate about helping others build their own businesses."
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="SA"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MentorCard
                  name="Michael Roth"
                  role="Tech & Engineering Mentor"
                  description="Experienced software engineer and tech lead, passionate about mentoring aspiring developers."
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="MR"
                />
                <MentorCard
                  name="Lisa Wang"
                  role="Business Strategy Mentor"
                  description="Seasoned business consultant with expertise in strategic planning and growth hacking."
                  avatarSrc="/placeholder-user.jpg"
                  avatarFallback="LW"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-[#5e0797] text-white">
        <p className="text-xs">
          &copy; 2024 Mentor Connect. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

// Icons
function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

// Mentor Card Component
type MentorCardProps = {
  name: string;
  role: string;
  description: string;
  avatarSrc: string;
  avatarFallback: string;
};

function MentorCard({
  name,
  role,
  description,
  avatarSrc,
  avatarFallback,
}: MentorCardProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-[#666]">{role}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <p className="text-sm text-[#666]">{description}</p>
    </div>
  );
}

function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}
