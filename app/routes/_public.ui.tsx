import { Trash2 } from 'lucide-react';

import { Button } from "~/components/button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/card/Card";
import { Container } from "~/components/container/Container";
import Input from "~/components/form/Input";
import { Select } from "~/components/form/Select";
import { Section } from "~/components/section/Section";

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
                        <h1>Flower Power - Kit de dibujos</h1>
                        <h2>Flower Power - Kit de dibujos</h2>
                        <h3>Flower Power - Kit de dibujos</h3>
                        <h4>Flower Power - Kit de dibujos</h4>
                        <h5>Flower Power - Kit de dibujos</h5>
                        <h6>Flower Power - Kit de dibujos</h6>
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
                        <h2>Color</h2>

                        <div style={{
                            display: "grid",
                            gap: 20,
                            marginTop: 20,
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        }}>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--background))" }}></div>--background</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--foreground))" }}></div>--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--card))" }}></div>--card</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--card--foreground))" }}></div>--card--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--popover))" }}></div>--popover</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--popover--foreground))" }}></div>--popover--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--button))" }}></div>--button</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--button--foreground))" }}></div>--button--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--primary))" }}></div>--primary</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--primary--foreground))" }}></div>--primary--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--secondary))" }}></div>--secondary</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--secondary--foreground))" }}></div>--secondary--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--muted))" }}></div>--muted</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--muted--foreground))" }}></div>--muted--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--accent))" }}></div>--accent</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--accent--foreground))" }}></div>--accent--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--destructive))" }}></div>--destructive</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--destructive--foreground))" }}></div>--destructive--foreground</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--border))" }}></div>--border</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--input))" }}></div>--input</div>
                            <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--ring))" }}></div>--ring</div>
                        </div>
                    </div>
                    <hr style={{ margin: "4rem 0" }} />
                    <div className="mt-10">
                        <h2>Buttons</h2>
                        <h4>Button HTML</h4>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 20,
                            marginTop: 20,
                            flexWrap: "wrap"
                        }}>
                            <button>Button</button>
                            <button disabled>Disabled</button>
                        </div>
                        <hr style={{ margin: "4rem 0" }} />
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
                            <Button variant="secondary">Secondary</Button>
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
                            <Button disabled variant="secondary">Secondary</Button>
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
                            <Button aria-label="delete" size='sm' variant='destructive'>
                                <Trash2 />
                                Eliminar
                            </Button>
                            <Button aria-label="delete" size='default' variant='destructive'>
                                <Trash2 />
                                Eliminar
                            </Button>
                            <Button aria-label="delete" size='lg' variant='destructive'>
                                <Trash2 />
                                Eliminar
                            </Button>
                            <Button aria-label="delete" size='sm' variant='destructive'>
                                <Trash2 />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="delete" size='default' variant='destructive'>
                                <Trash2 />
                                <span className="sr-only">Eliminar</span>
                            </Button>
                            <Button aria-label="delete" size='lg' variant='destructive'>
                                <Trash2 />
                                <span className="sr-only">Eliminar</span>
                            </Button>

                            <Button variant="default"><Trash2 /> Default</Button>
                            <Button variant="primary"><Trash2 /> Primary</Button>
                            <Button variant="secondary"><Trash2 /> Secondary</Button>
                            <Button variant="outline"><Trash2 /> Outline</Button>
                            <Button variant="dashed"><Trash2 /> Dashed</Button>
                            <Button variant="destructive"><Trash2 /> Destructive</Button>
                            <Button variant="ghost"><Trash2 /> Ghost</Button>
                            <Button variant="link"><Trash2 /> Link</Button>
                            <Button variant="default"><Trash2 /></Button>
                            <Button variant="primary"><Trash2 /></Button>
                            <Button variant="secondary"><Trash2 /></Button>
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
                        <label htmlFor="product-quantity">
                            <span className="sr-only">Quantity</span>
                            <span aria-hidden>Qty.</span>
                        </label>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test">Placeholder</label>
                            <input id="test" name="test" type="text" placeholder="Placeholder" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test1">Text</label>
                            <input id="test1" name="test1" type="text" value="Example 1" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test2">Email</label>
                            <input id="test2" name="test2" type="email" value="john@doe.com" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test3">Number</label>
                            <input id="test3" name="test3" type="number" value="1" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test4">Read Only</label>
                            <input id="test4" name="test4" type="text" value="Example 4" readOnly onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test5">Disabled</label>
                            <input id="test5" name="test5" type="text" value="Disabled" disabled onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test6">Search</label>
                            <input id="test6" name="test6" type="search" value="Search" aria-readonly="true" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test7">Text</label>
                            <input id="test7" name="test7" type="text" value="Example 7" aria-disabled="true" onChange={() => { }} />
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test8">Select</label>
                            <select id="test8" name="test8">
                                <option value="1" onChange={() => { }}>Example 1</option>
                                <option value="2" onChange={() => { }}>Example 2</option>
                                <option value="3" onChange={() => { }}>Example 3</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            <label htmlFor="test9">Textarea</label>
                            <textarea id="test9" name="test9" value="Example 1" onChange={() => { }} />
                        </div>
                        <div className="flex gap-4 mt-1">
                            <label htmlFor="test10">Checkbox</label>
                            <input id="test10" name="test10" type="checkbox" />
                            {/* disabled */}
                            <input id="test101" name="test101" type="checkbox" disabled />
                            {/* checked */}
                            <input id="test102" name="test102" type="checkbox" onChange={() => { }} checked />
                            {/* checked disabled */}
                            <input id="test103" name="test103" type="checkbox" onChange={() => { }} checked disabled />
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
                    <h2>Inputs MODULES</h2>
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
                            <textarea id="test9-2" name="test9-2" value="Example 1" onChange={() => { }} />
                        </div>
                        <div className="flex gap-4 mt-1">
                            <label htmlFor="test10">Checkbox</label>
                            <input id="test10" name="test10" type="checkbox" />
                            {/* disabled */}
                            <input id="test101" name="test101" type="checkbox" disabled />
                            {/* checked */}
                            <input id="test102" name="test102" type="checkbox" onChange={() => { }} checked />
                            {/* checked disabled */}
                            <input id="test103" name="test103" type="checkbox" onChange={() => { }} checked disabled />
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Title</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img src="hero/hero.jpg" alt="" />
                            <CardDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic exercitationem quis, soluta ea ipsa minus eum quos aliquam, eos ipsum quasi animi, laudantium officia totam id similique ut dolore.
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            Foooter
                        </CardFooter>
                    </Card>
                </div>
            </Container>
        </Section>
    )
}


export default ProductRoute