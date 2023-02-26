import * as dotenv from 'dotenv';
dotenv.config();
import { Server } from 'socket.io';

const io = new Server({
	cors: {
		origin: process.env.CLIENT_URL,
	},
});

let users: any[] = [];

const addUser = (userId: string, socketId: string) => {
	!users.some((user) => userId === user.userId) &&
		users.push({ userId, socketId });
};

const getUser = (userId: string) => {
	return users.find((user) => user.userId === userId);
};

const removeUser = (socketId: string) => {
	users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
	console.log('user connected');

	socket.on('addUser', (data) => {
		addUser(data, socket.id);
		io.emit('getUsers', users);
	});

	// socket.on('typing', ({ senderId, receiverId }) => {
	// 	const receiver = getUser(receiverId);
	// 	receiver?.socketId && io.to(receiver.socketId).emit('typing', { senderId });
	// });

	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		const receiver = getUser(receiverId);
		receiver?.socketId &&
			io.to(receiver.socketId).emit('getMessage', { senderId, text });
	});

	socket.on('disconnect', () => {
		removeUser(socket.id);
		console.log('user disconnected');
	});
});

io.listen(5005);
