import Button, { IconButton } from "~/components/button/Button"
import { IconTrash } from "~/components/svg"

function ProductRoute() {
    const onButtonClick = () => {
        alert('click')
    }

    return (
        <>
            <section className="product">
                <div className="container">
                    <nav className="navigation-back">
                        <a href="/products">
                            <span className="sr-only">Volver a la tienda</span>
                            <span aria-hidden>Volver</span>
                        </a>
                    </nav>
                    <div className="flex">
                        <form className="right" method="post" action="?">
                            <div className="title">
                                <h1>Flower Power - Kit de dibujos</h1>
                                <h2>Flower Power - Kit de dibujos</h2>
                                <h3>Flower Power - Kit de dibujos</h3>
                                <h4>Flower Power - Kit de dibujos</h4>
                                <h5>Flower Power - Kit de dibujos</h5>
                                <h6>Flower Power - Kit de dibujos</h6>
                            </div>
                            <div className="payment-options">
                                <a href="#">Ver formas de pago</a>
                            </div>
                            <div itemProp="description" className="description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quo omnis
                                    dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quo omnis
                                    dolore tempore maxime minima illum blanditiis dolores quod nostrum officiis magni est non aut distinctio quisquam, saepe tenetur nisi!
                                </p>
                            </div>

                            <h2>Inputs</h2>
                            <div className="quantity">
                                <label htmlFor="product-quantity">
                                    <span className="sr-only">Quantity</span>
                                    <span aria-hidden>Qty.</span>
                                </label>
                                <div className="mt-1">
                                    <label htmlFor="test">With Placeholder</label>
                                    <input id="test" name="test" type="text" placeholder="Placeholder" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test1">Example 1</label>
                                    <input id="test1" name="test1" type="text" value="Example 1" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test2">Example 2</label>
                                    <input id="email" name="email" type="email" value="john@doe.com" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test3">Example 3</label>
                                    <input id="product-quantity" name="product-quantity" type="number" value="1" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test4">Example 4</label>
                                    <input id="test4" name="test4" type="text" value="Example 4" readOnly />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test5">Example 5</label>
                                    <input id="test5" name="test5" type="text" value="Example 5" disabled />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test6">Example 6</label>
                                    <input id="test6" name="test6" type="text" value="Example 6" aria-readonly="true" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test7">Example 7</label>
                                    <input id="test7" name="test7" type="text" value="Example 7" aria-disabled="true" />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test8">Select</label>
                                    <select id="test8" name="test8">
                                        <option value="1">Example 1</option>
                                        <option value="2">Example 2</option>
                                        <option value="3">Example 3</option>
                                    </select>
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test9">Textarea</label>
                                    <textarea id="test9" name="test9" rows={4} cols={50}>
                                        Example 1
                                    </textarea>
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test10">Checkbox</label>
                                    <input id="test10" name="test10" type="checkbox" />
                                    {/* disabled */}
                                    <input id="test101" name="test101" type="checkbox" disabled />
                                    {/* checked */}
                                    <input id="test102" name="test102" type="checkbox" checked />
                                    {/* checked disabled */}
                                    <input id="test103" name="test103" type="checkbox" checked disabled />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test11">Radio</label>
                                    <input id="test11" name="test11" type="radio" value="1" />
                                    <input id="test12" name="test11" type="radio" value="0" />
                                    {/* disabled */}
                                    <input id="test13" name="test13" type="radio" value="1" disabled />
                                    <input id="test14" name="test13" type="radio" value="0" disabled />
                                    {/* checked */}
                                    <input id="test15" name="test15" type="radio" value="1" checked />
                                </div>
                                <div className="mt-1">
                                    <label htmlFor="test12">File</label>
                                    <input id="test12" name="test12" type="file" />
                                </div>
                            </div>
                            <div className="contrast">
                                <h2>Contrast</h2>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 20,
                                    marginTop: 20,
                                    flexWrap: "wrap"
                                }}>
                                    <div>Low Contrast
                                        <div style={{ width: '32px', height: '32px', backgroundColor: "var(--low-contrast)" }}></div>
                                    </div>
                                    <div>Medium Contrast
                                        <div style={{ width: '32px', height: '32px', backgroundColor: "var(--medium-contrast)" }}></div>
                                    </div>
                                    <div>High Contrast
                                        <div style={{ width: '32px', height: '32px', backgroundColor: "var(--high-contrast)" }}></div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="buy">
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
                                <h5>Button Color</h5>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 20,
                                    marginTop: 20,
                                    flexWrap: "wrap"
                                }}>
                                    <Button>Button</Button>
                                    <Button color="primary">Primary</Button>
                                    <Button color="accent">accent</Button>
                                    <Button color="danger">Danger</Button>
                                    <Button color="warning">Warning</Button>
                                    <Button color="success">Success</Button>
                                </div>
                                <h5>Button Variant</h5>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 20,
                                    marginTop: 20,
                                    flexWrap: "wrap"
                                }}>
                                    <Button variant="outline">Button</Button>
                                    <Button variant="outline" color="primary">Primary</Button>
                                    <Button variant="outline" color="accent">accent</Button>
                                    <Button variant="outline" color="danger">Danger</Button>
                                    <Button variant="outline" color="warning">Warning</Button>
                                    <Button variant="outline" color="success">Success</Button>
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
                                    <Button variant="outline" disabled>Button</Button>
                                    <Button variant="outline" disabled color="primary">Primary</Button>
                                    <Button variant="outline" disabled color="accent">accent</Button>
                                    <Button variant="outline" disabled color="danger">Danger</Button>
                                    <Button variant="outline" disabled color="warning">Warning</Button>
                                    <Button variant="outline" disabled color="success">Success</Button>
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
                                    <Button size="sm">Button</Button>
                                    <Button size="md">Button</Button>
                                    <Button size="lg">Button</Button>
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
                                    <IconButton aria-label="delete" size='sm' icon={<IconTrash />}>Eliminar</IconButton>
                                    <IconButton aria-label="delete" size='sm' variant="outline" icon={<IconTrash />}><span className="sr-only">Eliminar</span></IconButton>
                                </div>
                            </div>
                            <div className="tags">
                                <h5>Tags</h5>
                                <ul>
                                    <li>Tag 1</li>
                                    <li>Tag 2</li>
                                    <li>Tag 3</li>
                                </ul>
                            </div>
                        </form>
                    </div>
                    <div className="left">
                        <div className="product-images">
                            <img className="image-preview" src="https://d22fxaf9t8d39k.cloudfront.net/76211a877d2e7b0a6f3b323f16dbc60d9db523ce05977c92caf6a286b294c7ee152326.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default ProductRoute