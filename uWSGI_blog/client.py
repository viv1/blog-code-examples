import requests
from concurrent.futures import ThreadPoolExecutor

def send_request(query_param):
    print(f"Accept request: {query_param}")
    url = f'http://localhost:8000?param={query_param}'
    response = requests.get(url)
    print(f"Response: {response.text}")

def send_requests():
    with ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(send_request, f'Request_{i}') for i in range(20)]

if __name__ == "__main__":
    send_requests()
