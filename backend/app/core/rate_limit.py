"""
Single shared slowapi Limiter instance. Defined here (not in main.py) so
endpoint modules can import and apply `@limiter.limit(...)` without a
circular import back to the app entrypoint.
"""
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
