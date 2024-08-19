// 'use client';

// import { MessageCard } from '@/components/MessageCard';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Switch } from '@/components/ui/switch';
// import { useToast } from '@/components/ui/use-toast';
// import { Message } from '@/model/User';
// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import axios, { AxiosError } from 'axios';
// import { Loader2, RefreshCcw } from 'lucide-react';
// import { User } from 'next-auth';
// import { useSession } from 'next-auth/react';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';

// function UserDashboard() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);

//   const { toast } = useToast();

//   const handleDeleteMessage = (messageId: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   };

//   const { data: session } = useSession();

//   const form = useForm({
//     resolver: zodResolver(AcceptMessageSchema),
//   });

//   const { register, watch, setValue } = form;
//   const acceptMessages = watch('acceptMessages');

//   const fetchAcceptMessages = useCallback(async () => {
//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get<ApiResponse>('/api/accept-messages');
//       setValue('acceptMessages', response.data.isAcceptingMessages);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ??
//           'Failed to fetch message settings',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSwitchLoading(false);
//     }
//   }, [setValue, toast]);

//   const fetchMessages = useCallback(
//     async (refresh: boolean = false) => {
//       setIsLoading(true);
//       setIsSwitchLoading(false);
//       try {
//         const response = await axios.get<ApiResponse>('/api/get-messages');
//         setMessages(response.data.messages || []);
//         if (refresh) {
//           toast({
//             title: 'Refreshed Messages',
//             description: 'Showing latest messages',
//           });
//         }
//       } catch (error) {
//         const axiosError = error as AxiosError<ApiResponse>;
//         toast({
//           title: 'Error',
//           description:
//             axiosError.response?.data.message ?? 'Failed to fetch messages',
//           variant: 'destructive',
//         });
//       } finally {
//         setIsLoading(false);
//         setIsSwitchLoading(false);
//       }
//     },
//     [setIsLoading, setMessages, toast]
//   );

//   // Fetch initial state from the server
//   useEffect(() => {
//     if (!session || !session.user) return;

//     fetchMessages();

//     fetchAcceptMessages();
//   }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

//   // Handle switch change
//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages', {
//         acceptMessages: !acceptMessages,
//       });
//       setValue('acceptMessages', !acceptMessages);
//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ??
//           'Failed to update message settings',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (!session || !session.user) {
//     return <div></div>;
//   }

//   const { username } = session.user as User;

//   const baseUrl = `${window.location.protocol}//${window.location.host}`;
//   const profileUrl = `${baseUrl}/u/${username}`;

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     toast({
//       title: 'URL Copied!',
//       description: 'Profile URL has been copied to clipboard.',
//     });
//   };

//   return (
//     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">Mentor Dashboard</h1>

//       {/* <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex items-center">
//           <input
//             type="text
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           <Button onClick={copyToClipboard}>Copy</Button>
//         </div>
//       </div> */}

//       <div className="mb-4">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span className="ml-2">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>

//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               key={message._id}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;

"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { MessageCard } from "@/components/MessageCard";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User";

// Icons
function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// Main Component
export default function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pastMeetings, setPastMeetings] = useState<Message[]>([]); // Track past meetings
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Refreshed Messages",
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message ?? "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
        variant: "destructive",
      });
    }
  };

  const handleMoveToPast = (messageId: string) => {
    const messageToMove = messages.find((message) => message._id === messageId);
    if (messageToMove) {
      setPastMeetings((prev) => [...prev, messageToMove]);
      setMessages((prev) =>
        prev.filter((message) => message._id !== messageId)
      );
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  return (
    <div className="p-6 sm:p-10 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Meetings</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <CalendarIcon className="w-5 h-5 mr-2" />
              View Calendar
            </Button>
          </div>
        </div>

        {/* Meetings Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {messages.length > 0 ? (
            messages.map((message) => (
              <Card key={message._id} className="p-6 bg-background">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">{message.content}</p>
                    <h3 className="txt-sm">{message.createdAt}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500"
                      onClick={() => handleMoveToPast(message._id)} // Move to past on click
                    >
                      <CheckIcon className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleDeleteMessage(message._id)}
                    >
                      <XIcon className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>No meetings to display.</p>
          )}
        </div>

        {/* Past Meetings Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Past Meetings</h2>
          <Separator className="my-4" />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pastMeetings.length > 0 ? (
              pastMeetings.map((message) => (
                <Card key={message._id} className="p-6 bg-background">
                  <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">{message.content}</p>
                    <h3 className="txt-sm">{message.createdAt}</h3>
                  </div>
                </Card>
              ))
            ) : (
              <p>No past meetings yet.</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center">
            <Switch
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-2">Accept Messages</span>
          </div>
          <Button
            variant="outline"
            onClick={() => fetchMessages(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCcw className="w-4 h-4" />
            )}
            <span className="ml-2">Refresh Messages</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
