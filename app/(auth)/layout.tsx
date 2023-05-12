interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <section className="mt-40 flex w-full items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;
