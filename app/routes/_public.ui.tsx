import { LinksFunction } from '@remix-run/node';
import { EllipsisVertical, Pencil, Trash, Trash2, User } from 'lucide-react';

import { Button } from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Center } from '~/components/ui/center/Center';
import { Container } from "~/components/ui/container/Container";
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '~/components/ui/dialog/Dialog';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerTrigger } from '~/components/ui/drawer/Drawer';
import { Dropdown, DropdownContent, DropdownTrigger } from '~/components/ui/dropdown/Dropdown';
import { Fieldset } from '~/components/ui/form/Fieldset';
import { FormBlock } from '~/components/ui/form/FormBlock';
import Input from "~/components/ui/form/Input";
import { Select } from "~/components/ui/form/Select";
import TextArea from '~/components/ui/form/TextArea';
import { Link } from '~/components/ui/link/Link';
import { Section } from "~/components/ui/section/Section";
import { Text, Title } from '~/components/ui/text/Text';

import styles from "~/styles/ui.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

function ProductRoute() {
    return (
        <Section className="product" marginBottom>
            <Container>
                <nav className="navigation-back mt-10">
                    <a href="/products">
                        <span className="sr-only">Volver a la tienda</span>
                        <span aria-hidden>Volver</span>
                    </a>
                </nav>
                <div>
                    <div className="mt-10">
                        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h1>
                        <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h2>
                        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h3>
                        <h4>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h4>
                        <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h5>
                        <h6>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quo omnis
                            dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quo omnis
                            dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!
                        </p>
                        <a href="#">Ver formas de pago</a>
                    </div>
                    <div className="mt-10">
                        <Title size="xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</Title>
                        <Title size="lg">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</Title>
                        <Title size="md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</Title>
                        <Title size="sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Link href="#">Lorem ipsum</Link>
                    </div>
                    <div className="mt-10">
                        <h2>Contrast</h2>

                        <div style={{
                            display: "grid",
                            gap: 20,
                            marginTop: 20,
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        }}>
                            <div>
                                <div style={{ width: '32px', height: '32px', backgroundColor: "var(--low-contrast)" }}></div>
                                Low Contrast</div>
                            <div>
                                <div style={{ width: '32px', height: '32px', backgroundColor: "var(--medium-contrast)" }}></div>
                                Medium Contrast</div>
                            <div>
                                <div style={{ width: '32px', height: '32px', backgroundColor: "var(--high-contrast)" }}></div>
                                High Contrast</div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2>Shadows</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <hr />
                            <Center variant="all" className="square shadow-sm"><Title>shadow-sm</Title></Center>
                            <Center variant="all" className="square shadow-md"><Title>shadow-md</Title></Center>
                            <Center variant="all" className="square shadow-lg"><Title>shadow-lg</Title></Center>
                            <Center variant="all" className="square shadow-xl"><Title>shadow-xl</Title></Center>
                            <Center variant="all" className="square shadow-inner"><Title>shadow-inner</Title></Center>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Rings</h2>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <div className="square ring-0">--tw-ring-0</div>
                            <div className="square ring-1">--tw-ring-shadow</div>
                            <div className="square ring-2">--tw-ring-shadow-2</div>
                            <div className="square ring-3">--tw-ring-shadow-3</div>
                            <div className="square ring-4">--tw-ring-shadow-4</div>
                            <div className="square ring-8">--tw-ring-8</div>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Color</h2>

                        <div style={{
                            display: "grid",
                            gap: 20,
                            marginTop: 20,
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        }}>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--background))" }}></div>--background</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--foreground))" }}></div>--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--card))" }}></div>--card</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--card-foreground))" }}></div>--card-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--popover))" }}></div>--popover</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--popover-foreground))" }}></div>--popover-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--button))" }}></div>--button</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--button-foreground))" }}></div>--button-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--primary))" }}></div>--primary</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--primary-foreground))" }}></div>--primary-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--secondary))" }}></div>--secondary</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--secondary-foreground))" }}></div>--secondary-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--muted))" }}></div>--muted</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--muted-foreground))" }}></div>--muted-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--accent))" }}></div>--accent</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--accent-foreground))" }}></div>--accent-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--destructive))" }}></div>--destructive</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--destructive-foreground))" }}></div>--destructive-foreground</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--border))" }}></div>--border</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--input))" }}></div>--input</div>
                            <div><div style={{ width: '32px', height: '32px', border: "1px solid hsl(var(--foreground) / 0.2)", backgroundColor: "hsl(var(--ring))" }}></div>--ring</div>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Button Component</h2>
                        <h5>Button Variants</h5>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <Button variant="default">Default</Button>
                            <Button variant="primary">Primary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="dashed">Dashed</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>
                        <h5>Button Variant Disabled</h5>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <Button disabled>Button</Button>
                            <Button disabled variant="default">Default</Button>
                            <Button disabled variant="primary">Primary</Button>
                            <Button disabled variant="outline">Outline</Button>
                            <Button disabled variant="dashed">Dashed</Button>
                            <Button disabled variant="destructive">Destructive</Button>
                            <Button disabled variant="ghost">Ghost</Button>
                            <Button disabled variant="link">Link</Button>
                        </div>
                        <h5>Button Size</h5>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <Button size="sm">Small</Button>
                            <Button>Default</Button>
                            <Button size="lg">Large</Button>
                        </div>
                        <h5>Button Icon</h5>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            flexWrap: "wrap",
                            paddingBottom: '4rem'
                        }}>
                            <Button aria-label="delete" size='sm'>
                                User
                            </Button>
                            <Button aria-label="delete" size='sm'>
                                <User />
                                User
                            </Button>
                            <Button aria-label="delete" size='sm'>
                                <User />
                            </Button>
                            <Button aria-label="delete" size='default'>
                                User
                            </Button>
                            <Button aria-label="delete" size='default'>
                                <User />
                                User
                            </Button>
                            <Button aria-label="delete" size='lg'>
                                User
                            </Button>
                            <Button aria-label="delete" size='lg'>
                                <User />
                                User
                            </Button>

                            <hr />
                            <Button aria-label="delete" size='sm' variant='destructive'>
                                <Trash />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="delete" size='default' variant='destructive'>
                                <Trash />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="delete" size='lg' variant='destructive'>
                                <Trash />
                                <span className="sr-only">Eliminar</span>
                            </Button>

                            <Button variant="default"><Trash2 /> Default</Button>
                            <Button variant="primary"><Trash2 /> Primary</Button>
                            <Button variant="outline"><Trash2 /> Outline</Button>
                            <Button variant="dashed"><Trash2 /> Dashed</Button>
                            <Button variant="destructive"><Trash2 /> Destructive</Button>
                            <Button variant="ghost"><Trash2 /> Ghost</Button>
                            <Button variant="link"><Trash2 /> Link</Button>
                            <Button variant="default"><Trash2 /></Button>
                            <Button variant="primary"><Trash2 /></Button>
                            <Button variant="outline"><Trash2 /></Button>
                            <Button variant="dashed"><Trash2 /></Button>
                            <Button variant="destructive"><Trash2 /></Button>
                            <Button variant="ghost"><Trash2 /></Button>
                            <Button variant="link"><Trash2 /></Button>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <h2>Inputs</h2>
                    <div className="quantity">
                        <Input label="Placeholder" id="test-mdoule" name="test-mdoule" type="text" placeholder="Placeholder" />
                        <Input label="Text" id="text-module" name="text-module" type="text" value="Example 1" onChange={() => { }} />
                        <Input label="Email" id="test2-module" name="test2-module" type="email" value="john@doe.com" onChange={() => { }} />
                        <Input label="Number" id="test3-module" name="test3-module" type="number" value="1" onChange={() => { }} />
                        <Input label="Read Only" id="test4-module" name="test4-module" type="text" value="Example 4" readOnly onChange={() => { }} />
                        <Input label="Disabled" id="test5-module" name="test5-module" type="text" value="Disabled" disabled onChange={() => { }} />
                        <Input label="Search" id="test6-module" name="test6-module" type="search" value="Search" aria-readonly="true" onChange={() => { }} />
                        <Input label="Text" id="test7-module" name="test7-module" type="text" value="Example 7" aria-disabled="true" onChange={() => { }} />

                        <div className="flex items-center gap-4 mt-1">
                            <Select label="Select" id="test8-module" name="test8-module">
                                <option value="1" onChange={() => { }}>Example 1</option>
                                <option value="2" onChange={() => { }}>Example 2</option>
                                <option value="3" onChange={() => { }}>Example 3</option>
                            </Select>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test9-2">Textarea</label>
                            <TextArea id="test9-2" name="test9-2" value="Example 1" onChange={() => { }} />
                        </div>
                        <div className="flex gap-4 mt-1">
                            <Fieldset className="mt-4">
                                <legend>Checkbox</legend>
                                <FormBlock>
                                    <Input type="checkbox" label="Checkbox" id="markdown" name="markdown" defaultChecked={false} />
                                    <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
                                </FormBlock>
                            </Fieldset>
                            <Input id="test10" name="test10" type="checkbox" />
                            {/* disabled */}
                            <Input id="test101" name="test101" type="checkbox" disabled />
                            {/* checked */}
                            <Input id="test102" name="test102" type="checkbox" onChange={() => { }} checked />
                            {/* checked disabled */}
                            <Input id="test103" name="test103" type="checkbox" onChange={() => { }} checked disabled />
                        </div>
                        <div className="mt-1 flex gap-4">
                            <label htmlFor="test11">Radio</label>
                            <input id="test11" name="test11" type="radio" value="1" onChange={() => { }} />
                            <input id="test12" name="test11" type="radio" value="0" onChange={() => { }} />
                            {/* disabled */}
                            <input id="test13" name="test13" type="radio" value="1" disabled onChange={() => { }} />
                            <input id="test14" name="test13" type="radio" value="0" disabled onChange={() => { }} />
                            {/* checked */}
                            <input id="test15" name="test15" type="radio" value="1" onChange={() => { }} checked />
                        </div>
                        <div className="mt-1 flex items-center gap-4">
                            <label htmlFor="test12">File</label>
                            <input id="test12" name="test12" type="file" />
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div style={{ maxWidth: "500px" }}>
                        <Card>
                            <CardPadding>
                                <CardImageCover src="hero/hero.jpg">
                                    <img src="hero/hero.jpg" alt="" />
                                </CardImageCover>
                            </CardPadding>
                            <CardHeader>
                                <CardTitle>Title</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic exercitationem quis, soluta ea ipsa minus eum quos aliquam, eos ipsum quasi animi, laudantium officia totam id similique ut dolore.
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                Foooter
                            </CardFooter>
                        </Card>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div style={{ maxWidth: "50mvw" }}>
                        <h3>Modals</h3>
                        <Dialog>
                            <DialogTrigger>Show Dialog</DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Title</DialogTitle>
                                <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo consequuntur vero temporibus illo corrupti, consectetur minus libero perspiciatis suscipit veritatis reiciendis sint deleniti vitae numquam voluptatem ad quas dolorem? Eligendi.</DialogDescription>
                                <DialogCloseButton>Close</DialogCloseButton>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="p-8">
                        <h3>Drawer</h3>
                        <Drawer>
                            <DrawerTrigger>
                                Open Drawer
                            </DrawerTrigger>
                            <DrawerContent open={true} onClose={() => { }}>
                                <Text style={{ padding: "2rem" }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ratione quam quo amet sed facilis doloribus, incidunt maiores! Id amet modi expedita ad dolores? Non obcaecati suscipit deserunt ipsa sit.
                                </Text>
                                <div style={{ padding: "2rem" }}>
                                    <DrawerCloseButton>Close</DrawerCloseButton>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="p-8">
                        <h3>Dropdowns</h3>
                        <Dropdown>
                            <DropdownTrigger>
                                Select Option
                            </DropdownTrigger>
                            <DropdownContent items={[
                                {
                                    label: <><Pencil size={16} /> Edit</>,
                                    onClick: () => console.log('Edit clicked')
                                },
                                {
                                    label: 'Duplicate',
                                    onClick: () => console.log('Duplicate clicked'),
                                },
                                {
                                    divider: true,
                                    label: <><Trash2 size={16} /> Delete</>,
                                    onClick: () => console.log('Delete clicked'),
                                    variant: 'destructive'
                                },
                            ]} />
                        </Dropdown>
                        <div style={{ margin: "2rem 0" }}>
                            <Dropdown>
                                <DropdownTrigger asChild>
                                    <Button variant="outline">
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownContent>
                                    <Center style={{ width: "200px", height: "200px" }} variant="all">
                                        Custom Content
                                    </Center>
                                </DropdownContent>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    )
}


export default ProductRoute