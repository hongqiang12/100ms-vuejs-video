export const IS_DEV = process.env.NODE_ENV === "development";

export const BASE_API_URL =
  IS_DEV && !process.server ? "/api/v1" : "https://api.100ms.live/v2";

export const STRIPE_PUBLIC_KEY = IS_DEV
  ? "pk_test_51MI5jvHQzZdDmyPqCjGz7Uh5Kt8c2y6grLDTel7RAOWfU4mfYUMKZoIQ3RgQk2DP5ELdwxkd20KRG0NtihXQaMLC00w4ErPuwP"
  : "pk_test_51MI5jvHQzZdDmyPqCjGz7Uh5Kt8c2y6grLDTel7RAOWfU4mfYUMKZoIQ3RgQk2DP5ELdwxkd20KRG0NtihXQaMLC00w4ErPuwP";

// export const STRIPE_PUBLIC_KEY = IS_DEV
//   ? "pk_test_51MI5jvHQzZdDmyPqCjGz7Uh5Kt8c2y6grLDTel7RAOWfU4mfYUMKZoIQ3RgQk2DP5ELdwxkd20KRG0NtihXQaMLC00w4ErPuwP"
//   : "pk_live_51MI5jvHQzZdDmyPqiI0hoydqmHDKk9q7xMCy8ZBJHoXNosWvqTnUp1I6Ha1DSW1znY87up1e6QOLJ1JhZdsZW0Qr00mXU2XWY5";

export const LANGUAGE = ["en", "it", "fr"];
