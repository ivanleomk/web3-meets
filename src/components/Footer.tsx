import Image from "next/image";

const Footer = () => {
  return (
    <footer className="max-w-container mx-auto mt-32 w-full px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 py-10">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" height={40} width={40} alt="Logo" />
        </div>

        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2022-2023 Web3Meets Inc. All rights reserved.
        </p>
        <div className="mt-16 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <p>Helping build Singapore&apos;s crypto community</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
