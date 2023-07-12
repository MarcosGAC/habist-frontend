import React, { useState } from "react";
import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import logo from "../assets/logo.svg";

export default function Header({ dark }: any) {
  return (
    <div className=" w-full max-w-3xl mx-auto flex items-center justify-between  ">
      <div className="text-4xl w-28 font-bold">
        <img src={logo} className="justify-center items-center flex" />
        Habits
      </div>

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex gap-2 items-center hover:border-violet-400"
        >
          <Plus size={20} className=" text-violet-800" />
          Novo Habito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen bg-black/80 fixed inset-0 h-screen"/>

          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Conteudo do modal</Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
