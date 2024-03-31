"use client";

import { ListGroup } from "flowbite-react";

export function Categories() {
    return (
        <div className="flex max-md:invisible justify-center">
            <ListGroup className="flex w-screen rounded-none text-xl">
                <ListGroup.Item>
                    All
                </ListGroup.Item>
                <ListGroup.Item>Fashion</ListGroup.Item>
                <ListGroup.Item>Mobile</ListGroup.Item>
                <ListGroup.Item>Computer</ListGroup.Item>
                <ListGroup.Item>Apple</ListGroup.Item>
                <ListGroup.Item>Samsung</ListGroup.Item>
                <ListGroup.Item>Hermes</ListGroup.Item>
                {/*<ListGroup.Item>Car</ListGroup.Item>*/}
                {/*<ListGroup.Item>Watch</ListGroup.Item>*/}
                {/*<ListGroup.Item>Headphone</ListGroup.Item>*/}
                {/*<ListGroup.Item>Accessory</ListGroup.Item>*/}
            </ListGroup>
        </div>
    );
}
