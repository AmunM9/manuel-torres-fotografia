import { Hero } from "@/components/home/Hero";
import { Glimpse } from "@/components/home/Glimpse";
import { About } from "@/components/home/About";
import { Featured } from "@/components/home/Featured";
import { heroPhotos } from "@/lib/weddings";

export default function Home() {
  return (
    <>
      <Hero photos={heroPhotos()} />
      <Glimpse />
      <About />
      <Featured />
    </>
  );
}
