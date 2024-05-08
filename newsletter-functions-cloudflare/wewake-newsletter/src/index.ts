/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		async function readRequestBody(request: Request) {
			const contentType = request.headers.get("content-type");
			if (contentType && contentType.includes("form")) {
				const formData = await request.formData();
				const email = formData.get('email')
				console.log("email added: " + email)
				return email;
			} else {
			  // Perhaps some other type of data was submitted in the form
			  // like an image, or some other binary data.
			  return null;
			}
		  }

		if (request.method === "POST") {
			const reqBody = await readRequestBody(request);
			if (reqBody != null) {
				const res = {
					email: reqBody
				}
				return Response.json({ status: 200 });
			}
		  }
		// return empty
		return Response.json({status: 400 });
	},
};
