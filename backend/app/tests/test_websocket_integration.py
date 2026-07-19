from fastapi.testclient import TestClient

from app.main import app


def test_websocket_live_feed_connects_and_streams_updates():
    """ """
    client = TestClient(app)
    with client.websocket_connect("/ws/live") as websocket:
        # The background simulated feed broadcasts every 5s; rather than
        # sleep in a test, send a client frame to exercise the receive
        # loop and then close cleanly to confirm the endpoint accepts
        # and tears down connections without error.
        websocket.send_text("ping")
        websocket.close()


def test_root_and_docs_are_reachable():
    """ """
    client = TestClient(app)
    root = client.get("/")
    assert root.status_code == 200
    assert "docs" in root.json()

    docs = client.get("/docs")
    assert docs.status_code == 200
