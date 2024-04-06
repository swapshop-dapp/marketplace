import { ComponentProps } from 'react';
import { FileUploader }   from '@app/components/FileUploader';
import {
    Button,
    FloatingLabel
}                         from 'flowbite-react';

export const EditProductComponent: React.FC<ComponentProps<any>> = (props) => {
    return (
        <div className={'py-3 dark:text-white'}>
            <span className={"text-4xl"}>Add Product</span>
            <form>
                <div className={'grid w-full grid-cols-4 gap-2 rounded border border-gray-500'}>
                    <div className={'col-span-2 p-10'}>
                        <div className={"p-3"}>
                            <FileUploader></FileUploader>
                        </div>
                        <div className={"p-3"}>
                        </div>
                    </div>
                    <div className={'col-span-2 w-full flex-col gap-4 p-6'}>
                        <div className={'my-3'}>
                            <span className={"mb-3 text-xl"}>Post</span>
                        </div>
                        <FloatingLabel className={"w-full"} label="Title *" type="text" required
                                       variant={'standard'}/>
                        <FloatingLabel className={"w-full"} label="Description *" type="email" required
                                       variant={'standard'} sizing={'md'} inputMode={'text'}/>
                        
                        <div className={'my-3'}>
                            <span className={' text-xl'}>Details</span>
                        </div>
                        <FloatingLabel className={"w-full"} label="Status" type="email" required
                                       variant={'standard'}/>
                        <FloatingLabel className={"w-full"} label="Device" type="email" required
                                       variant={'standard'}/>
                        <FloatingLabel className={"w-full"} label="Manufacturer" type="email" required
                                       variant={'standard'}/>
                        <FloatingLabel className={"w-full"} label="Warranty Policy" type="email" required
                                       variant={'standard'}/>
                        <FloatingLabel className={"w-full"} label="Location" type="email" required
                                       variant={'standard'}/>
                        <div className={"flex justify-between align-bottom md:mt-20"}>
                            <Button className={"w-1/3 text-center"}>Preview</Button>
                            <Button className={"w-1/3 text-center"}>Post</Button>
                        </div>
                    
                    </div>
                </div>
            </form>
        </div>
    )
}