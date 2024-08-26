import { toast } from "sonner";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getConfigFn, postConfigFn } from "../../api/config";

import Input from "../ui/input/Input";

const ConfigForm = () => {
  const QueryClient = useQueryClient();

  const { data: config } = useQuery({
    queryKey: ["config"],
    queryFn: () => getConfigFn(),
  });

  const {
    register,
    setValue,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (config) {
      setValue("cantidadMesas", config.data.cantidadMesas);
    }
  }, [config]);

  const { mutate: postConfig } = useMutation({
    mutationFn: postConfigFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Configuracion actualizada");

      QueryClient.invalidateQueries({
        queryKey: ["config"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleSubmit = (data) => {
    postConfig(data);
  };

  return (
    <section>
      <h1 className="titulo my-2 text-center">Ingreso de productos</h1>
      <form onSubmit={onSubmitRHF(handleSubmit)} className="cardUsuario p-2">
        <Input
          register={register}
          name="cantidadMesas"
          label="Cantidad de mesas"
          errors={errors.cantidadMesas}
          type="number"
          options={{
            required: "El campo es requerido",
            min: {
              value: 1,
              message: "El campo debe ser positivo",
            },
            max: {
              value: 100,
              message:
                "Si tu negocio supera las 100 mesas comunicate con el administrador para adaptar este campo",
            },
          }}
          labelClassName="productEditLabel"
          inputClassName="productEditInput"
          ClassName=" p-0 ps-1"
        />
        <div className="d-flex justify-content-center justify-content-sm-end gap-2 p-0 my-1">
          <button type="submit" className="confirm-button-class">
            Guardar
          </button>
        </div>
      </form>
    </section>
  );
};
export default ConfigForm;
