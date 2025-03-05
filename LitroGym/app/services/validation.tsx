import { z } from "zod";

export function validateForm<T>(
  formData: FormData,
  schema: z.Schema<T>,
  onSuccess: (data: T) => any,
  onError: (errors: z.ZodError) => any // Acepta el objeto ZodError completo
) {
  const data = Object.fromEntries(formData);
  const result = schema.safeParse(data);

  if (result.success) {
    return onSuccess(result.data);
  } else {
    return onError(result.error); // Pasamos el objeto ZodError completo
  }
}
