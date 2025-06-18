
export default function SucessoAgendamentoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Agendamento realizado com sucesso!
        </h2>
        <p className="text-gray-600 mb-6">
          Seu horário foi confirmado. Enviamos os detalhes para o seu email.
        </p>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Por favor, chegue com 5 minutos de antecedência.
          </p>
        </div>
      </div>
    </div>
  );
}
