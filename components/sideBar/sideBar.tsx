import Image from "next/image"
import Logo from "../Logo"

export default function AuthSideBar() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="container mx-auto px-8 py-4 flex items-center">
          <Logo />
          </div>
   
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/BrainBot.jpeg?height=900&width=1280"
            alt="Main content image"
            layout="fill"
            objectFit="cover"
          />
        </div>
     
      </main>

     

    </div>
  )
}
