function ProductRoute() {
    return (
        <>
            <section className="product">
                <div className="container">
                    <nav className="navigation-back">
                        <a href="/store">
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

                            <h2>Inputs</h2>
                            <div className="quantity">
                                <label htmlFor="product-quantity">
                                    <span className="sr-only">Quantity</span>
                                    <span aria-hidden>Qty.</span>
                                </label>
                                <div>
                                    <label htmlFor="test">With Placeholder</label>
                                    <input id="test" name="test" type="text" placeholder="Placeholder" />
                                </div>
                                <div>
                                    <label htmlFor="test1">Example 1</label>
                                    <input id="test1" name="test1" type="text" value="Example 1" />
                                </div>
                                <div>
                                    <label htmlFor="test2">Example 2</label>
                                    <input id="email" name="email" type="email" value="john@doe.com" />
                                </div>
                                <div>
                                    <label htmlFor="test3">Example 3</label>
                                    <input id="product-quantity" name="product-quantity" type="number" value="1" />
                                </div>
                                <div>
                                    <label htmlFor="test4">Example 4</label>
                                    <input id="test4" name="test4" type="text" value="Example 4" readOnly />
                                </div>
                                <div>
                                    <label htmlFor="test5">Example 5</label>
                                    <input id="test5" name="test5" type="text" value="Example 5" disabled />
                                </div>
                                <div>
                                    <label htmlFor="test6">Example 6</label>
                                    <input id="test6" name="test6" type="text" value="Example 6" aria-readonly="true" />
                                </div>
                                <div>
                                    <label htmlFor="test7">Example 7</label>
                                    <input id="test7" name="test7" type="text" value="Example 7" aria-disabled="true" />
                                </div>
                                <div>
                                    <label htmlFor="test8">Select</label>
                                    <select id="test8" name="test8">
                                        <option value="1">Example 1</option>
                                        <option value="2">Example 2</option>
                                        <option value="3">Example 3</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="test9">Textarea</label>
                                    <textarea id="test9" name="test9" rows={4} cols={50}>
                                        Example 1
                                    </textarea>
                                </div>
                                <div>
                                    <label htmlFor="test10">Checkbox</label>
                                    <input id="test10" name="test10" type="checkbox" />
                                    {/* disabled */}
                                    <input id="test101" name="test101" type="checkbox" disabled />
                                    {/* checked */}
                                    <input id="test102" name="test102" type="checkbox" checked />
                                    {/* checked disabled */}
                                    <input id="test103" name="test103" type="checkbox" checked disabled />
                                </div>
                                <div>
                                    <label htmlFor="test11">Radio</label>
                                    <input id="test11" name="test11" type="radio" value="1" />
                                    <input id="test12" name="test11" type="radio" value="0" />
                                    {/* disabled */}
                                    <input id="test13" name="test13" type="radio" value="1" disabled />
                                    <input id="test14" name="test13" type="radio" value="0" disabled />
                                    {/* checked */}
                                    <input id="test15" name="test15" type="radio" value="1" checked />
                                </div>
                                <div>
                                    <label htmlFor="test12">File</label>
                                    <input id="test12" name="test12" type="file" />
                                </div>
                            </div>
                            <div className="buy">
                                <h2>Buttons</h2>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 20
                                }}>
                                    <button>Button</button>
                                    {/* button disabled */}
                                    <button disabled>Button Disabled</button>

                                    {/* button className */}
                                    <a id="button" className="button" href="#button">
                                        Link Button
                                    </a>
                                    {/* button className primary shadow */}
                                    <button className="button primary">
                                        Button Primary Shadow
                                    </button>
                                    <button className="button secondary">
                                        Button Primary Secondary
                                    </button>
                                    <button className="button primary shadow buy-button">
                                        Button Primary Shadow
                                    </button>
                                    {/* button primary disabled */}
                                    <button className="button primary shadow buy-button" disabled>
                                        Button Primary Disabled
                                    </button>
                                    {/* button primary loading */}
                                    <button className="button primary shadow buy-button" disabled>
                                        <span className="sr-only">Loading...</span>
                                        <span aria-hidden>Loading...</span>
                                    </button>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: 20,
                                    marginTop: 20
                                }}>
                                    <button className="outline">Button</button>
                                    {/* button disabled */}
                                    <button className="outline" disabled>Button Disabled</button>

                                    {/* button className */}
                                    <a id="button" className="button outline" href="#button">
                                        Link Button
                                    </a>
                                    {/* button className primary shadow */}
                                    <button className="button outline primary">
                                        Button Primary Shadow
                                    </button>
                                    <button className="button outline secondary">
                                        Button Primary Secondary
                                    </button>
                                    <button className="button outline primary shadow buy-button">
                                        Button Primary Shadow
                                    </button>
                                    {/* button primary disabled */}
                                    <button className="button outline primary shadow buy-button" disabled>
                                        Button Primary Disabled
                                    </button>
                                    {/* button primary loading */}
                                    <button className="button outline primary shadow buy-button" disabled>
                                        <span className="sr-only">Loading...</span>
                                        <span aria-hidden>Loading...</span>
                                    </button>
                                </div>
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
                            <div className="tags">
                                <span>Tags</span>
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