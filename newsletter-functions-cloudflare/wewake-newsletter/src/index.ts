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

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
  }

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const corsHeaders = {
			'Access-Control-Allow-Headers': '*', // What headers are allowed. * is wildcard. Instead of using '*', you can specify a list of specific headers that are allowed, such as: Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization.
			'Access-Control-Allow-Methods': 'POST', // Allowed methods. Others could be GET, PUT, DELETE etc.
			'Access-Control-Allow-Origin': '*', // This is URLs that are allowed to access the server. * is the wildcard character meaning any URL can.
		  }

		async function readRequestBody(request: Request) {
			const contentType = request.headers.get("content-type");
			if (contentType && contentType.includes("form")) {
				const formData = await request.formData();
				const email = formData.get('email')

				const query = `
				INSERT INTO NewsletterEmails (email)
				VALUES (?)`;

				const result  = await env.DB
					.prepare(query)
					.bind(email)
					.run();
				
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
				return Response.json({ status: 200 }, {headers: corsHeaders });
			}
		  }
		// return empty
		return Response.json({status: 400}, {headers: corsHeaders });
	},
};
