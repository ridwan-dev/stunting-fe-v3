const WidgetCard = {
    /**
     * Render the page content.
     */
    render: async (id, title, background, column = 12, color = 'orange-transparent-8') => {
        return /*html*/ `
          
        <div class="col-${column}">
            <div class="card bg-${background} h-100">
                <div class="card-body">
                    <h5 class="card-title fs-13px text-black text-uppercase">${title}</h5>
                    <div id=${id} style="height:100%">
                        <div class="d-flex justify-content-center ">
                            <div class="spinner-border text-${color} mt-2 " role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `;
    },
    after_render: async () => { }
};
export default WidgetCard;
