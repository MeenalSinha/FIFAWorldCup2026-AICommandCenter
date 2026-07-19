import pytest

from app.ws.manager import ConnectionManager


class _FakeWebSocket:
    """ """
    def __init__(self, fail_on_send: bool = False):
        self.accepted = False
        self.sent = []
        self.fail_on_send = fail_on_send

    async def accept(self):
        self.accepted = True

    async def send_text(self, message: str):
        if self.fail_on_send:
            raise RuntimeError("connection closed")
        self.sent.append(message)


@pytest.mark.asyncio
async def test_connect_accepts_and_registers_socket():
    manager = ConnectionManager()
    socket = _FakeWebSocket()
    await manager.connect(socket)
    assert socket.accepted is True
    assert socket in manager._connections


@pytest.mark.asyncio
async def test_broadcast_sends_to_all_connected_sockets():
    manager = ConnectionManager()
    a, b = _FakeWebSocket(), _FakeWebSocket()
    await manager.connect(a)
    await manager.connect(b)
    await manager.broadcast({"type": "live_update", "gates": []})
    assert len(a.sent) == 1
    assert len(b.sent) == 1


@pytest.mark.asyncio
async def test_broadcast_drops_dead_sockets():
    manager = ConnectionManager()
    dead = _FakeWebSocket(fail_on_send=True)
    await manager.connect(dead)
    await manager.broadcast({"type": "live_update"})
    assert dead not in manager._connections


@pytest.mark.asyncio
async def test_disconnect_removes_socket():
    manager = ConnectionManager()
    socket = _FakeWebSocket()
    await manager.connect(socket)
    await manager.disconnect(socket)
    assert socket not in manager._connections
