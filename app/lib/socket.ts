import { serverUrl } from '@/env/serverUrl';
import io from 'socket.io-client';

const socket = io.connect(serverUrl!);

export default socket;