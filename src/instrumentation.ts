export async function register() {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function (input, init) {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;

    const method = init?.method ?? "GET";
    const isMutation = ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase());

    const response = await originalFetch(input, init);
    const clone = response.clone();

    clone.text().then((body) => {
      console.log(`\n[FETCH] ${method} ${url}`);

      if (isMutation && init?.body) {
        try {
          console.log("[REQUEST BODY]", JSON.parse(init.body as string));
        } catch {
          console.log("[REQUEST BODY]", init.body);
        }
      }

      console.log(`[STATUS] ${response.status}`);
      try {
        console.log("[RESPONSE]", JSON.parse(body));
      } catch {
        console.log("[RESPONSE]", body.slice(0, 500));
      }
    });

    return response;
  };
}
