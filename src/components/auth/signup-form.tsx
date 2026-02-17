"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Eye, EyeOff, AlertCircle, Loader2, Circle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .email("Preencha com um email válido"),
    phone: z
      .string()
      .min(1, "Campo obrigatório")
      .regex(
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
        "Preencha com um celular válido."
      ),
    password: z
      .string()
      .min(1, "Campo obrigatório")
      .min(8, "Pelo menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Campo obrigatório"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

const passwordRequirements = [
  { label: "Pelo menos 8 caracteres.", test: (v: string) => v.length >= 8 },
  {
    label: "Letras maiúsculas e minúsculas.",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { label: "Números.", test: (v: string) => /\d/.test(v) },
  {
    label: "Pelo menos 1 caractere especial (como ! @ # $ % &).",
    test: (v: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v),
  },
]

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const passwordValue = watch("password")

  const reqStatus = useMemo(
    () => passwordRequirements.map((req) => req.test(passwordValue || "")),
    [passwordValue]
  )

  async function onSubmit(data: SignupFormData) {
    setIsLoading(true)
    // TODO: Integrate with API
    console.log("Signup data:", data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <h1 className="font-[var(--font-syne)] text-[26px] font-extrabold leading-tight text-foreground mb-1.5">
        Crie uma conta
      </h1>
      <p className="text-[13px] text-muted-foreground mb-8 leading-relaxed">
        {"Informe seus dados e comece a agendar seus serviços com facilidade!"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-[13px] font-medium text-foreground"
          >
            Email <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="ex: cliente@gmail.com"
              autoComplete="email"
              className={cn(
                "w-full rounded-xl border bg-secondary px-3.5 py-3 pr-10 text-[14px] text-foreground outline-none transition-colors placeholder:text-[#444]",
                errors.email
                  ? "border-destructive bg-destructive/[0.07]"
                  : "border-border focus:border-primary focus:bg-accent"
              )}
              {...register("email")}
            />
            {errors.email && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                <AlertCircle className="size-[15px]" />
              </span>
            )}
          </div>
          {errors.email && (
            <p className="text-[11.5px] text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-[13px] font-medium text-foreground"
          >
            Celular <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="phone"
              type="text"
              placeholder="(27)00000-0000"
              autoComplete="tel"
              className={cn(
                "w-full rounded-xl border bg-secondary px-3.5 py-3 pr-10 text-[14px] text-foreground outline-none transition-colors placeholder:text-[#444]",
                errors.phone
                  ? "border-destructive bg-destructive/[0.07]"
                  : "border-border focus:border-primary focus:bg-accent"
              )}
              {...register("phone")}
            />
            {errors.phone && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
                <AlertCircle className="size-[15px]" />
              </span>
            )}
          </div>
          {errors.phone && (
            <p className="text-[11.5px] text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="signup-password"
            className="text-[13px] font-medium text-foreground"
          >
            Senha <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              autoComplete="new-password"
              className={cn(
                "w-full rounded-xl border bg-secondary px-3.5 py-3 pr-10 text-[14px] text-foreground outline-none transition-colors placeholder:text-[#444]",
                errors.password
                  ? "border-destructive bg-destructive/[0.07]"
                  : "border-border focus:border-primary focus:bg-accent"
              )}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-muted-foreground transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="size-[15px]" />
              ) : (
                <Eye className="size-[15px]" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11.5px] text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-[13px] font-medium text-foreground"
          >
            Confirmar senha <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••"
              autoComplete="new-password"
              className={cn(
                "w-full rounded-xl border bg-secondary px-3.5 py-3 pr-10 text-[14px] text-foreground outline-none transition-colors placeholder:text-[#444]",
                errors.confirmPassword
                  ? "border-destructive bg-destructive/[0.07]"
                  : "border-border focus:border-primary focus:bg-accent"
              )}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-muted-foreground transition-colors"
              aria-label={
                showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="size-[15px]" />
              ) : (
                <Eye className="size-[15px]" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11.5px] text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password Requirements Checklist */}
        <ul className="flex flex-col gap-1.5 pl-0.5">
          {passwordRequirements.map((req, i) => (
            <li key={i} className="flex items-center gap-2 text-[12px]">
              {reqStatus[i] ? (
                <CheckCircle2 className="size-3.5 text-primary shrink-0" />
              ) : (
                <Circle className="size-3.5 text-muted-foreground shrink-0" />
              )}
              <span
                className={cn(
                  reqStatus[i] ? "text-primary" : "text-muted-foreground"
                )}
              >
                {req.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-primary py-3.5 font-[var(--font-syne)] text-[15px] font-bold text-primary-foreground transition-colors hover:bg-[#00aebb] active:scale-[0.985] disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="mx-auto size-5 animate-spin" />
          ) : (
            "Criar conta"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2.5 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11.5px] text-[#444] whitespace-nowrap">
          Criar com
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google Sign-up */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-secondary px-4 py-3 text-[13.5px] font-medium text-foreground transition-colors hover:bg-accent"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Cadastrar com o Google
      </button>

      {/* Login link */}
      <p className="mt-6 text-center text-[13px] text-muted-foreground">
        {"Já tem uma conta? "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}
