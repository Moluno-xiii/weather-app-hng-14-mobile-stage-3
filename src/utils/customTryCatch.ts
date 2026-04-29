const customTryCatch = async <T>(
  url: string,
  method: string = "GET",
): Promise<T> => {
  try {
    const request = await fetch(`${url}`, { method });
    if (!request.ok) throw new Error(`An error occured: ${request.statusText}`);
    const response: T = await request.json();
    return response;
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Unexpected error, try again later.";
    console.error(`An error occured from : ${url} \n ${message}`);
    throw new Error(message);
  }
};

export default customTryCatch;
