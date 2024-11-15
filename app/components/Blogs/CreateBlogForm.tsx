"use client";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useEffect, useRef, useState } from "react";
import { handleBlogCreation } from "../../actions";
import FileUpload from "../shared/FileUpload";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Button as NextUIButton } from "@nextui-org/react";
import { useTranslations } from "next-intl";
function CreateBlogForm() {
  const [fileWrongSize, setFileWrongSize] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const thumbnailFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const [adding, setAdding] = useState(false);

  const t = useTranslations("Blogs")

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (message !== null) {
      let timer: NodeJS.Timeout;
      if (message) {
        timer = setTimeout(() => {
          setMessage(null);
          onClose();
        }, 3000);
      }
      return () => clearTimeout(timer);
    }
    return;
  }, [message, onClose]);

  const handleFileChange = () => {
    const imageFiles =
      thumbnailFileInputRef.current && thumbnailFileInputRef.current.files;
    const isFileSizeExceeded = Array.from(imageFiles ?? []).some(
      (file) => file.size > 4.5 * 1024 * 1024
    );
    setFileWrongSize(isFileSizeExceeded);
    setSelectedFile(imageFiles && imageFiles[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdding(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    try {
      await handleBlogCreation(formData);
      setMessage("Blog Created Successfully!");
      onOpen()
      if (formRef.current) {
        formRef.current.reset();
      }
      if (thumbnailFileInputRef.current) {
        thumbnailFileInputRef.current.value = "";
      }
      setSelectedFile(null);
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error("Failed to create blog", error);
      setMessage("Blog Created Successfully!");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="container">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mb-[100px] flex flex-col gap-[100px] mt-[40px] items-center"
      >
        <div className="flex w-full justify-between gap-[150px]">
          <div className="w-[42%] flex mx-auto flex-col gap-5">
            <Input name="title" required placeHolder={t('title')} label={t('title')} labelClassName="text-[#6C7275] text-[0.75rem] font-bold "></Input>
            <FileUpload
              handleFileChange={handleFileChange}
              ref={thumbnailFileInputRef}
              selectedFile={selectedFile}
              fileWrongSize={fileWrongSize}
              placeholder={t('imageInput')}
            ></FileUpload>
            <label
              htmlFor="content"
              className="font-bold flex-1 text-[#6C7275] text-[0.75rem] flex flex-col gap-[12px]"
            >
              {t('blog')}
              <textarea
                className="border-[1px] leading-[24px] text-gray-800 resize-none h-[350px] placeholder:font-normal font-bold border-solid text-[1rem] p-[10px] border-[#CBCBCB] outline-none rounded-xl"
                name="content"
                id="content"
                required
              />
            </label>
          </div>
        </div>
        <Button
          type="submit"
          fontSize="1rem"
          leading="28px"
          padding="px-[40px] py-[12px]"
          className="mx-auto"
          disabled={fileWrongSize || adding}
        >
          {adding ? t('submiting') : t('submit')}
        </Button>
         <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">{t('status')}</ModalHeader>
            <ModalBody>
              <p>{message?.includes('Failed') ? t('failed') : t('success')}</p>
            </ModalBody>
            <ModalFooter>
              <NextUIButton color="primary" variant="light" onPress={onClose}>
                {t('close')}
              </NextUIButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </div>
  );
}

export default CreateBlogForm;
