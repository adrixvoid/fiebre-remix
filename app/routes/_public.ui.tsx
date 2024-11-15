import { LinksFunction } from '@remix-run/node';
import { EllipsisVertical, Music, Pencil, ShoppingCart, Ticket, Trash2, User } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Alert } from '~/components/ui/alert/Alert';

import { Button } from "~/components/ui/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImageCover, CardPadding, CardTitle } from "~/components/ui/card/Card";
import { Center } from '~/components/ui/center/Center';
import { Chip } from '~/components/ui/chip/Chip';
import { Container } from "~/components/ui/container/Container";
import { Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '~/components/ui/dialog/Dialog';
import { Drawer, DrawerCloseButton, DrawerContent, DrawerTrigger } from '~/components/ui/drawer/Drawer';
import { Dropdown, DropdownContent, DropdownTrigger } from '~/components/ui/dropdown/Dropdown';
import { Flex } from '~/components/ui/flex/Flex';
import { Fieldset } from '~/components/ui/form/Fieldset';
import { FormBlock } from '~/components/ui/form/FormBlock';
import Input from "~/components/ui/form/Input";
import { Select } from "~/components/ui/form/Select";
import TextArea from '~/components/ui/form/TextArea';
import { Grid } from '~/components/ui/grid/Grid';
import { Link } from '~/components/ui/link/Link';
import { Section } from "~/components/ui/section/Section";
import { Text, Title } from '~/components/ui/text/Text';
import { Toggle } from '~/components/ui/toggle/Toggle';

import styles from "~/styles/ui.css";

export const links: LinksFunction = () => [
    {
        rel: "stylesheet",
        href: styles,
    },
];

function Swatch({ name, children, ...props }: { name: string } & PropsWithChildren) {
    return (
        <Flex direction='column' className="swatch" style={{ backgroundColor: `hsl(var(${name}))` }} {...props}>
            <Center variant='all' className="swatch-label">{name}</Center>
            {children}
        </Flex>
    )
}

const swatches: {
    background: string,
    foreground?: string
}[] = [{
    background: "--color-brand"
}, {
    background: "--color-brand-secondary"
}, {
    background: "--color-brand-light"
}, {
    background: "--color-brand-highlight"
}, {
    background: "--color-brand-a90"
}, {
    background: "--background",
    foreground: "--foreground"
}, {
    background: "--card",
    foreground: "--card-foreground"
}, {
    background: "--popover",
    foreground: "--popover-foreground",
}, {
    background: "--button",
    foreground: "--button-foreground",
}, {
    background: "--primary",
    foreground: "--primary-foreground",
}, {
    background: "--secondary",
    foreground: "--secondary-foreground",
}, {
    background: "--muted",
    foreground: "--muted-foreground",
}, {
    background: "--accent",
    foreground: "--accent-foreground",
}, {
    background: "--destructive",
    foreground: "--destructive-foreground",
}];

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
                <hr style={{ margin: "4rem 0" }} />
                <div>
                    <div className="mt-10">
                        <h2>Title</h2>
                        <Title size="xxl">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Title size="xl">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Title size="lg">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Title size="md">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Title size="sm">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                        <Title size="xs">Hagamos que la magia suceda</Title>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam ducimus perspiciatis, quos eius voluptate, consequatur aspernatur ipsa provident excepturi maxime praesentium iure? Dicta commodi culpa illum sunt ratione. Fuga?</Text>
                    </div>
                    <div className="mt-10">
                        <p>Officia quo omnis  dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quo omnis
                            dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!
                        </p>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Links</h2>
                        <Flex>
                            <Link href="#">Click here!</Link>
                        </Flex>
                        <Flex>
                            <a href="#">Ver formas de pago</a>
                        </Flex>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Color</h2>
                        <Grid className='swatches' columns='4' style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                            {swatches.map(s => <Swatch key={s.background} name={s.background}>
                                {s.foreground && <Swatch name={s.foreground} />}
                            </Swatch>
                            )}
                            <Center variant='all' className="swatch" style={{ backgroundColor: "hsl(var(--border))" }}>
                                --border
                            </Center>
                            <Center variant='all' className="swatch" style={{ backgroundColor: "hsl(var(--input))" }}>
                                --input
                            </Center>
                            <Center variant='all' className="swatch" style={{ backgroundColor: "hsl(var(--ring))" }}>
                                --ring
                            </Center>
                        </Grid>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Contrast</h2>

                        <Grid columns='3' style={{ gridTemplateColumns: "1fr 1fr 1fr" }} >
                            <div>
                                <Swatch name="--low-contrast"></Swatch>
                                <Center style={{ color: "hsl(var(--low-contrast))" }}>Low Contrast</Center>
                            </div>
                            <div>
                                <Swatch name="--medium-contrast"></Swatch>
                                <Center style={{ color: "hsl(var(--medium-contrast))" }}>Medium Contrast</Center>
                            </div>
                            <div>
                                <Swatch name="--high-contrast"></Swatch>
                                <Center style={{ color: "hsl(var(--high-contrast))" }}>High Contrast</Center>
                            </div>
                        </Grid>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
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
                            <Center variant="all" className="square shadow-sm"><Text>shadow-sm</Text></Center>
                            <Center variant="all" className="square shadow-md"><Text>shadow-md</Text></Center>
                            <Center variant="all" className="square shadow-lg"><Text>shadow-lg</Text></Center>
                            <Center variant="all" className="square shadow-xl"><Text>shadow-xl</Text></Center>
                            <Center variant="all" className="square shadow-inner"><Text>shadow-inner</Text></Center>
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
                            <div className="square ring-0">--ring-0</div>
                            <div className="square ring-1">--ring-1</div>
                            <div className="square ring-2">--ring-2</div>
                            <div className="square ring-3">--ring-3</div>
                            <div className="square ring-4">--ring-4</div>
                            <div className="square ring-8">--ring-8</div>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div style={{ margin: "2rem 0" }}>
                        <h3>Alert</h3>
                        <Flex direction='column'>
                            <Alert variant="info" title="Information">
                                This is an informational alert.
                            </Alert>
                            <Alert variant="warning" title="Warning">
                                This is a warning alert.
                            </Alert>
                            <Alert variant="danger" title="Error" onClose={() => console.log('Alert closed')}>
                                This is an error alert with a close button.
                            </Alert>
                            <Alert variant="success">
                                This is a success alert without a title.
                            </Alert>
                            <Alert variant="light" title="Light Theme">
                                This is a light-themed alert.
                            </Alert>
                            <Alert variant="dark" title="Dark Theme">
                                This is a dark-themed alert.
                            </Alert>
                        </Flex>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Button Component</h2>
                        <div style={{ margin: "4rem 0" }} />
                        <h3>Button Variants</h3>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <Button>Default</Button>
                            <Button variant="primary">Primary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="dashed">Dashed</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>
                        <div style={{ margin: "2rem 0" }} />
                        <h3>Button Variant Disabled</h3>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <Button disabled>Button</Button>
                            <Button disabled>Default</Button>
                            <Button disabled variant="primary">Primary</Button>
                            <Button disabled variant="outline">Outline</Button>
                            <Button disabled variant="dashed">Dashed</Button>
                            <Button disabled variant="destructive">Destructive</Button>
                            <Button disabled variant="ghost">Ghost</Button>
                            <Button disabled variant="link">Link</Button>
                        </div>
                        <div style={{ margin: "2rem 0" }} />
                        <h3>Button Size</h3>
                        <Flex align='center'>
                            <Button size="sm">Small</Button>
                            <Button>Default</Button>
                            <Button size="lg">Large</Button>
                            <Button aria-label="Example button icon" size='sm'>
                                <User />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="Example button icon">
                                <User />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="Example button icon" size='lg'>
                                <User />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                        </Flex>
                        <div style={{ margin: "2rem 0" }} />
                        <h3>Button comparison</h3>
                        <Flex align='center'>
                            <Button aria-label="example" size='sm'>
                                User
                            </Button>
                            <Button aria-label="example" size='sm'>
                                <User />
                            </Button>
                            <Button aria-label="example" size='sm'>
                                <User />
                                User
                            </Button>
                            <Button aria-label="example">
                                User
                            </Button>
                            <Button aria-label="example">
                                <User />
                            </Button>
                            <Button aria-label="example">
                                <User />
                                User
                            </Button>
                            <Button aria-label="example" size='lg'>
                                User
                            </Button>
                            <Button aria-label="example" size='lg'>
                                <User />
                            </Button>
                            <Button aria-label="example" size='lg'>
                                <User />
                                User
                            </Button>
                            <Button variant="outline" size='sm'><ShoppingCart /> Agregar al carrito</Button>
                            <Button variant="outline" size='md'><ShoppingCart /> Agregar al carrito</Button>
                            <Button variant="outline" size='lg'><ShoppingCart /> Agregar al carrito</Button>
                        </Flex>
                        <div style={{ margin: "2rem 0" }} />
                        <h3>Radius</h3>
                        <Flex align='center' style={{ margin: "2rem 0", flexWrap: 'wrap' }}>
                            <Button variant="outline" radius='sm'><ShoppingCart /> Button Radius sm</Button>
                            <Button variant="outline" radius='md'><ShoppingCart /> Button Radius md</Button>
                            <Button variant="outline" radius='lg'><ShoppingCart /> Button Radius lg</Button>
                        </Flex>
                        <div style={{ margin: "2rem 0" }} />
                        <h3>More...</h3>
                        <Flex align='center' style={{ flexWrap: 'wrap' }}>
                            <Button><Trash2 /> Default</Button>
                            <Button variant="primary"><Trash2 /> Primary</Button>
                            <Button variant="outline"><Trash2 /> Outline</Button>
                            <Button variant="dashed"><Trash2 /> Dashed</Button>
                            <Button variant="destructive"><Trash2 /> Destructive</Button>
                            <Button variant="ghost"><Trash2 /> Ghost</Button>
                            <Button variant="link"><Trash2 /> Link</Button>
                            <Button><Trash2 /></Button>
                            <Button variant="primary"><Trash2 /></Button>
                            <Button variant="outline"><Trash2 /></Button>
                            <Button variant="dashed"><Trash2 /></Button>
                            <Button variant="destructive"><Trash2 /></Button>
                            <Button variant="ghost"><Trash2 /></Button>
                            <Button variant="link"><Trash2 /></Button>
                        </Flex>
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
                        <div style={{ margin: "4rem 0" }} />
                        <div className="flex gap-4 mt-1">
                            <h2>Checkbox</h2>
                            <Fieldset className="mt-4">
                                <legend>legend of checkboxes</legend>
                                <FormBlock>
                                    <Input type="checkbox" label="Checkbox" id="markdown" name="markdown" defaultChecked={false} />
                                    <Input type="checkbox" label="Save as draft" id="draft" name="draft" defaultChecked={true} />
                                </FormBlock>
                            </Fieldset>
                            <Flex>
                                <FormBlock>
                                    <Input id="test10" name="test10" type="checkbox" label='default' />
                                    {/* disabled */}
                                    <Input id="test101" name="test101" type="checkbox" label='disabled' disabled />
                                    {/* checked */}
                                    <Input id="test102" name="test102" type="checkbox" label='selected' onChange={() => { }} checked />
                                    {/* checked disabled */}
                                    <Input id="test103" name="test103" type="checkbox" label='selected disabled' onChange={() => { }} checked disabled />
                                </FormBlock>
                            </Flex>
                        </div>
                        <div style={{ margin: "4rem 0" }} />
                        <div className="mt-1 flex gap-4">
                            <h2>Radio</h2>
                            <FormBlock>
                                <Input label="base" name="test-base" type="radio" value="1" onChange={() => { }} />
                                <Input label="value default 0" name="test-base" type="radio" value="0" onChange={() => { }} />
                                <Input label="checked" name="test-base" type="radio" value="2" onChange={() => { }} />
                                {/* disabled */}
                                <Input label="disabled value 1" id="test14" name="test-disabled" type="radio" value="1" onChange={() => { }} disabled />
                                <Input label="disabled value 0" id="test15" name="test-disabled" type="radio" value="0" onChange={() => { }} disabled />
                                <Input label="disabled checked" id="test16" name="test-disabled" type="radio" value="0" onChange={() => { }} disabled checked />
                                {/* checked */}
                            </FormBlock>
                        </div>
                        <hr style={{ margin: "4rem 0" }} />
                        <div className="mt-1 flex items-center gap-4">
                            <h2>File</h2>
                            <Input label="Select one file" id="test22" name="test22" type="file" />
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <h1>Cards</h1>
                    <Flex>
                        <Card>
                            <CardPadding>
                                <CardImageCover src="hero/hero.jpg">
                                    <img src="hero/hero.jpg" alt="" />
                                </CardImageCover>
                            </CardPadding>
                            <CardHeader>
                                <CardTitle>Default</CardTitle>
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
                        <Card border>
                            <CardPadding>
                                <CardImageCover src="hero/hero.jpg">
                                    <img src="hero/hero.jpg" alt="" />
                                </CardImageCover>
                            </CardPadding>
                            <CardHeader>
                                <CardTitle>Border</CardTitle>
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
                        <Card background>
                            <CardPadding>
                                <CardImageCover src="hero/hero.jpg">
                                    <img src="hero/hero.jpg" alt="" />
                                </CardImageCover>
                            </CardPadding>
                            <CardHeader>
                                <CardTitle>Background</CardTitle>
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
                        <Card shadow>
                            <CardPadding>
                                <CardImageCover src="hero/hero.jpg">
                                    <img src="hero/hero.jpg" alt="" />
                                </CardImageCover>
                            </CardPadding>
                            <CardHeader>
                                <CardTitle>Shadow</CardTitle>
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
                    </Flex>
                    <hr style={{ margin: "4rem 0" }} />
                    <div style={{ maxWidth: "50mvw" }}>
                        <h3>Dialog</h3>
                        <Flex gap='2rem'>
                            <Dialog>
                                <DialogTrigger>Dialog</DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Title</DialogTitle>
                                    <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo consequuntur vero temporibus illo corrupti, consectetur minus libero perspiciatis suscipit veritatis reiciendis sint deleniti vitae numquam voluptatem ad quas dolorem? Eligendi.</DialogDescription>
                                    <DialogCloseButton>Close</DialogCloseButton>
                                </DialogContent>
                            </Dialog>
                            <Dialog blockDialog>
                                <DialogTrigger>Dialog blocking window</DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Title</DialogTitle>
                                    <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo consequuntur vero temporibus illo corrupti, consectetur minus libero perspiciatis suscipit veritatis reiciendis sint deleniti vitae numquam voluptatem ad quas dolorem? Eligendi.</DialogDescription>
                                    <DialogCloseButton>Close</DialogCloseButton>
                                </DialogContent>
                            </Dialog>
                        </Flex>
                    </div>
                    <div style={{ margin: "4rem 0" }} />
                    <div>
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
                    <div>
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
                                    <div style={{ padding: 20 }}>
                                        <Title size='xl'>Custom Content</Title>
                                        <a href="http://www.google.com">External Link</a>
                                        <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi repudiandae consequatur nostrum omnis fugit aspernatur placeat consequuntur, adipisci delectus ullam dolores quos rem sunt voluptate minus quidem enim facere architecto!</Text>
                                    </div>
                                </DropdownContent>
                            </Dropdown>
                        </div>
                        <hr style={{ margin: "4rem 0" }} />
                        <div style={{ margin: "2rem 0" }}>
                            <h3>Toggle</h3>
                            <Flex>
                                <Toggle
                                    label="xs"
                                    onChange={(checked) => console.log(checked)}
                                    size='xs'
                                />
                                <Toggle
                                    label="sm"
                                    onChange={(checked) => console.log(checked)}
                                    size='sm'
                                />
                                <Toggle
                                    label="md"
                                    onChange={(checked) => console.log(checked)}
                                    size='md'
                                />
                                <Toggle
                                    label="lg"
                                    onChange={(checked) => console.log(checked)}
                                    size='lg'
                                />
                            </Flex>
                        </div>
                        <div style={{ margin: "2rem 0" }}>
                            <h3>Chip</h3>
                            <Flex align='center' wrap="wrap">
                                <Chip variant='outlined'>Art</Chip>
                                <Chip onDismiss={() => console.log("dismiss")} variant='outlined'><Music size={16} /> Art</Chip>
                                <Chip><Music size={16} /> Music</Chip>
                                <Chip>Shows <Ticket size={20} /></Chip>
                                <Chip onDismiss={() => console.log("dismiss")}>Dacing</Chip>
                                <Chip variant='filled' color='success' onDismiss={() => console.log("dismiss")}>Success</Chip>
                                <Chip variant='outlined' color='success' onDismiss={() => console.log("dismiss")}>Success</Chip>
                                <Chip variant='filled' color='warning' onDismiss={() => console.log("dismiss")}>Warning</Chip>
                                <Chip variant='outlined' color='warning' onDismiss={() => console.log("dismiss")}>Warning</Chip>
                                <Chip variant='filled' color='error' onDismiss={() => console.log("dismiss")}>Error</Chip>
                                <Chip variant='outlined' color='error' onDismiss={() => console.log("dismiss")}>Error</Chip>
                            </Flex>
                        </div>
                    </div>
                </div>
            </Container>
        </Section >
    )
}


export default ProductRoute