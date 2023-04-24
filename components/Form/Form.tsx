import { useState } from "react";
import { useForm } from "react-hook-form";
import { Div } from "./Div";
import { sendContactForm } from "@/lib/api";
import { Inputs } from "@/types/types";

const Form = () => {
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: Inputs) => {
    setIsloading(true);
    await sendContactForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Div errors={errors.firstName}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          aria-invalid={errors.firstName ? "true" : "false"}
          aria-describedby="error-name-required error-name-minLength"
          {...register("firstName", {
            required: "First Name is required",
            minLength: {
              value: 4,
              message: "Min length is 4",
            },
          })}
          placeholder="First Name"
        />
        {errors.firstName && errors.firstName.type === "required" && (
          <span role="alert" id="error-name-required">
            {errors.firstName?.message}
          </span>
        )}
        {errors.firstName && errors.firstName.type === "minLength" && (
          <span role="alert" id="error-name-minLength">
            {errors.firstName?.message}
          </span>
        )}
      </Div>
      <Div errors={errors.lastName}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        {errors.lastName && <span>Last Name is required</span>}
      </Div>
      <button type="submit" disabled={isLoading || !isValid}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
