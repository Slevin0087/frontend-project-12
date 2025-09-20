import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { unshowModalComponent } from '../store/modalsSlice'
import modalsBody from '../components/modalBodys/selectModalBody.js'

function ModalComponent() {
  const dispatch = useDispatch()
  const show = useSelector(state => state.modals.modalComponent.show)
  const title = useSelector(state => state.modals.modalComponent.title)
  const modalBodyType = useSelector(state => state.modals.modalComponent.modalBodyType)
  const BodyComponent = modalsBody[modalBodyType]
  const handleUnshow = () => dispatch(unshowModalComponent())
  
  return (
    <Modal show={show} centered>
      <Modal.Header className="btn" closeButton onClick={() => handleUnshow()}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {BodyComponent && <BodyComponent />}
        </Modal.Body>
    </Modal>
  )
}

export default ModalComponent
