import Image from "next/image";
import authIntroImage from "@/images/auth/auth-intro.webp";
import Blob from "@/components/Blob";

export default function AuthContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="grid md:grid-cols-2 md:h-screen place-items-center md:p-10 gap-10 lg:gap-16">
      <div className="relative md:flex md:items-center md:justify-center size-full rounded-xl overflow-hidden mx-auto w-full py-6 max-md:py-10 px-6 bg-linear-to-b from-secondary-400 via-white to-secondary-600 mt-px">
        <Blob variant="tertiary" size="sm" />
        <Image
          src={authIntroImage}
          alt="Auth intro"
          sizes="(min-width: 1024px) 40vw, 80vw"
          className="object-cover max-md:max-w-64 mx-auto w-full"
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAACowAAAAoCAYAAADO4kpCAAACGElEQVR42u3aAREAMAgAIU2+6K7HH+Rgb+4NAAAAAAAAAAAAAFkrjAIAAAAAAAAAAAC0CaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQJwwCgAAAAAAAAAAABAnjAIAAAAAAAAAAADECaMAAAAAAAAAAAAAccIoAAAAAAAAAAAAQNwHfoljsXJ1beUAAAAASUVORK5CYII="
        />
      </div>

      <div className="flex size-full items-center">{children}</div>
    </div>
  );
}
