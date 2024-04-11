import time

def long_running_task():
    time.sleep(10)
    return "true"

def application(env, start_response):
    query_string = env.get('QUERY_STRING', '')

    query_params = {}
    for param in query_string.split('&'):
        key, value = param.split('=')
        query_params[key] = value

    # Get the 'param' value from the query parameters
    param_value = query_params.get('param', 'No param value provided')

    print(f"Accept incoming request: {param_value}")
    start_response('200 OK', [('Content-Type', 'text/plain')])
    return [long_running_task().encode()]
