import Link from "next/link";
import { Button } from "@/components/Button"
import { RiArrowRightLine } from "@remixicon/react"

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Button asChild className="group mt-8" variant="light">
          <Link href="/auth/login">
            Go to the login page
            <RiArrowRightLine
              className="ml-1.5 size-5 text-gray-900 dark:text-gray-50"
              aria-hidden="true"
            />
          </Link>
        </Button>
      </main>
    </div>
  );
}

export default Home;
