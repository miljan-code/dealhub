interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <section className="mt-12 flex w-full items-center justify-center md:mt-32">
      {children}
    </section>
  );
};

export default AuthLayout;
