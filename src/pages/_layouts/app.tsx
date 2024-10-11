import Header from "@/components/Header";
import { api } from "@/lib/axios";
import { Paths } from "@/routes";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // interceptar respostas da api
    const interceptorId = api.interceptors.response.use(
      (response) => response, // caso há sucesso na resposta
      (error) => {
        // Caso há error
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data.code;

          // verificar se o error é referente ao usuário está deslogado na aplicação
          if (status === 401 && code === "UNAUTHORIZED") {
            navigate(Paths.SIGN_IN, { replace: true });
          } else {
            throw error;
          }
        }
      },
    );

    // Limpar o event listener
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
