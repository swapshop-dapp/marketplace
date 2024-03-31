
"use client";

import { Label, TextInput } from "flowbite-react";
import {
    HiMail,
    HiSearch
} from "react-icons/hi";

export function SearchInput() {
    return (
        <div className="md:w-2/5">
            <TextInput id="search" type="text" icon={HiSearch} placeholder="Search something" />
        </div>
    );
}
