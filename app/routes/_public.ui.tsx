import { Button } from "~/components/ui/button"
import { IconTrash } from "~/components/svg"

function ProductRoute() {
    return (
        <>
            <section className="product">
                <div className="container">
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
                                <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--border-input))" }}></div>--border-input</div>
                                <div><div style={{ width: '32px', height: '32px', boxShadow: '0px 1px 5px #eaeaea', backgroundColor: "hsl(var(--ring))" }}></div>--ring</div>
                            </div>
                        </div>
                        <hr />
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
                            <hr />
                            <h4>Button Component</h4>
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
                                {/* <Button variant="highlight">Highlight</Button> */}
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
                                marginTop: 20,
                                flexWrap: "wrap"
                            }}>
                                <Button aria-label="delete" size='sm' variant='destructive'>
                                    <IconTrash />
                                    Eliminar
                                </Button>
                                <Button aria-label="delete" size='sm' variant='destructive'>
                                    <IconTrash />
                                    <span className="sr-only">Eliminar</span>
                                </Button>
                            </div>
                        </div>
                        <hr />
                        <h2>Inputs</h2>
                        <div className="quantity">
                            <label htmlFor="product-quantity">
                                <span className="sr-only">Quantity</span>
                                <span aria-hidden>Qty.</span>
                            </label>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test">Placeholder</label>
                                <input id="test" name="test" type="text" placeholder="Placeholder" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test1">Text</label>
                                <input id="test1" name="test1" type="text" value="Example 1" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test2">Email</label>
                                <input id="test2" name="test2" type="email" value="john@doe.com" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test3">Number</label>
                                <input id="test3" name="test3" type="number" value="1" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test4">Read Only</label>
                                <input id="test4" name="test4" type="text" value="Example 4" readOnly />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test5">Disabled</label>
                                <input id="test5" name="test5" type="text" value="Disabled" disabled />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test6">Search</label>
                                <input id="test6" name="test6" type="search" value="Search" aria-readonly="true" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test7">Text</label>
                                <input id="test7" name="test7" type="text" value="Example 7" aria-disabled="true" />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test8">Select</label>
                                <select id="test8" name="test8">
                                    <option value="1">Example 1</option>
                                    <option value="2">Example 2</option>
                                    <option value="3">Example 3</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <label htmlFor="test9">Textarea</label>
                                <textarea id="test9" name="test9" rows={4} cols={50}>
                                    Example 1
                                </textarea>
                            </div>
                            <div className="flex gap-4 mt-1">
                                <label htmlFor="test10">Checkbox</label>
                                <input id="test10" name="test10" type="checkbox" />
                                {/* disabled */}
                                <input id="test101" name="test101" type="checkbox" disabled />
                                {/* checked */}
                                <input id="test102" name="test102" type="checkbox" checked />
                                {/* checked disabled */}
                                <input id="test103" name="test103" type="checkbox" checked disabled />
                            </div>
                            <div className="mt-1 flex gap-4">
                                <label htmlFor="test11">Radio</label>
                                <input id="test11" name="test11" type="radio" value="1" />
                                <input id="test12" name="test11" type="radio" value="0" />
                                {/* disabled */}
                                <input id="test13" name="test13" type="radio" value="1" disabled />
                                <input id="test14" name="test13" type="radio" value="0" disabled />
                                {/* checked */}
                                <input id="test15" name="test15" type="radio" value="1" checked />
                            </div>
                            <div className="mt-1 flex items-center gap-4">
                                <label htmlFor="test12">File</label>
                                <input id="test12" name="test12" type="file" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="product-images">
                            <img className="image-preview" src="hero/hero.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default ProductRoute