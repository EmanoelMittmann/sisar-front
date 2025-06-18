export default function SucessoAgendamentoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="h-16 bg-[#9E9E9E] px-6 w-full flex items-center">
        <h5 className="text-4xl text-[#fff]">sisar</h5>
      </nav>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
