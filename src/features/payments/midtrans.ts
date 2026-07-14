export interface MidtransCallbacks {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

export function openMidtransSnap(
  snapToken: string,
  callbacks?: MidtransCallbacks,
) {
  if (typeof window === "undefined") {
    throw new Error("Window tidak tersedia.");
  }

  if (!window.snap) {
    throw new Error("Midtrans Snap belum dimuat.");
  }

  window.snap.pay(snapToken, {
    onSuccess: callbacks?.onSuccess,
    onPending: callbacks?.onPending,
    onError: callbacks?.onError,
    onClose: callbacks?.onClose,
  });
}
