import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import coffee from "@/public/images/coffee.jpg";
import _ from "lodash";
import LazyLoadingExample from "./LazyLoadingExample";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative h-screen">
      <div>
        {session ? (
          <div className=" flex flex-col">
            <h1> Hello {session.user?.name!} 👋🏾</h1>
            <Link
              className=" p-4 bg-green-500 rounded-xl text-center"
              href={"/users"}
            >
              To Users
            </Link>
          </div>
        ) : (
          <>
            <h1 className=""> Hello, Please Login or Sign Up</h1>
            <div className=" flex items-center justify-center space-x-8">
              <Link
                className=" p-4 bg-green-500 rounded-xl"
                href={"/api/auth/signin"}
              >
                Sign In
              </Link>
              <Link
                className=" p-4 bg-green-500 rounded-xl"
                href={"/auth/new-user"}
              >
                Sign Up
              </Link>
            </div>
          </>
        )}
      </div>
      <div>
        <LazyLoadingExample />
      </div>
    </main>
  );
}
