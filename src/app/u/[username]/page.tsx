"use client";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [activeMentor, setActiveMentor] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete("");
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Handle error appropriately
    }
  };

  const mentors = [
    {
      name: "Nigga",
      experience: "10 years in software engineering",
      mainId: "john_doe@gmail.com",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Jaya Singh",
      experience: "8 years in UI design",
      mainId: "yahasingh@gmail.com",
      imageUrl: "/jaya.jpeg",
    },
    {
      name: "Bob Johnson",
      experience: "12 years in data science",
      mainId: "bob_johnson@gmail.com",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-6 bg-white rounded max-w-5xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Meet Our Mentors
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get Guidance from Industry Experts
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our mentors are seasoned professionals with years of experience in
              their respective fields. They&apos;re here to provide you with
              personalized guidance and support.
            </p>
          </div>
        </div>

        <Separator className="my-6" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "John R",
              experience: "10 years in software engineering",
              mainId: "john_doe@gmail.com",
              imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            },
            {
              name: "Sia Lance",
              experience: "8 years in UI design",
              mainId: "sia@gmail.com",
              imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
            },
            {
              name: "Bob Johnson",
              experience: "12 years in data science",
              mainId: "bob_johnson@gmail.com",
              imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
            },
          ].map((mentor) => (
            <Card
              key={mentor.mainId}
              className="p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:-translate-y-2"
            >
              <CardHeader>
                {/* <img
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                /> */}
                <Image
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mt-4">{mentor.name}</h3>
              </CardHeader>
              <CardContent>
                <p>Experience: {mentor.experience}</p>
                <div className="flex gap-2 justify-start items-center ">
                  <MailIcon className="w-5 h-5 text-muted-foreground" />
                  <p>{mentor.mainId}</p>
                </div>
                <Button
                  onClick={() => setActiveMentor(mentor.mainId)}
                  className="mt-4 bg-[#5e0797]"
                >
                  Send Meeting Request
                </Button>
                {activeMentor === mentor.mainId && (
                  <div className="mt-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message to {mentor.name}</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Write your message here"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={() => setActiveMentor(null)}
                            className="mr-2 bg-[#5e0797]"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-[#5e0797]">
                            Send
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
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

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
