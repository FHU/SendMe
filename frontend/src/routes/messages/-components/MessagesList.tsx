// import api, { type components } from "@sendme/api";
import { Message , MessageType} from "./Message"

interface MessagesListProps {
	messages: MessageType[];
}

 const MessagesList: React.FC<MessagesListProps> = ({messages}) => {

	console.log(messages)

	return (
		<>
			{messages.map((msg) => (
				<Message
					key={msg.id} // Ensure each element has a unique key
					message={msg}
				/>
			))}
		</>
	);
}

export default MessagesList;