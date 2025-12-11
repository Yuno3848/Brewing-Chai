import React from "react";
import { useForm } from "react-hook-form";

const ApplyForInstructor = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm();
  return <div>apply for instructor</div>;
};

export default ApplyForInstructor;
