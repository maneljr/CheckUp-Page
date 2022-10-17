import { IResponseExtension } from "./types";

const sendMessageToExtension = async (
  extensionId: string,
  type: string,
  payload: null
) => {
  return new Promise<IResponseExtension>((resolve, _) => {
    chrome.runtime.sendMessage(
      extensionId,
      {
        type,
        url: window.location.href,
        payload,
      },
      (res) => resolve(res)
    );
  });
};

export { sendMessageToExtension };
