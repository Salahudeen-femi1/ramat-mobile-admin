import Modal from "./Modal";

interface MenuModalProps {
  onClose: () => void;
}

export default function MenuModal( {onClose}: MenuModalProps ) {
  return (
 <Modal onClose={onClose}>
  hello

 </Modal>
  )
}
