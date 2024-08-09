"use client";
import Image from "next/image";
import LoginForm from "@ncl/app/components/login/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="w-full lg:w-[544px] max-w-full px-6 lg:px-16">
        <div className="flex items-center h-full">
          <div className="w-full md:w-96">
            <div>
              <Image
                className="mx-auto"
                src="/logo.svg"
                alt="NCL Certificaciones Logo"
                width={160}
                height={24}
                priority
              />
              <h2 className="mt-10 text-center text-2xl uppercase font-semibold tracking-tight text-gray-900">
                Bienvenido a NCL Certificaciones
              </h2>
            </div>

            <div className="mt-6">{LoginForm()}</div>
          </div>
        </div>
      </div>
      <div className="h-auto hidden lg:block flex-1 h-screen">
        <img
          className="w-full h-full object-cover"
          src="/hero-paper-check.webp"
          alt="Imagen de formulario de Alistamiento"
        />
      </div>
    </main>
  );
}
