const WidgetCardLink = {
    /**
     * Render the page content.
     */
    render: async (id, title, icon, background, column = 12, color = 'orange-transparent-8', urlp, description = "") => {
        return /*html*/ `
        <div class="col-${column} p-1" id="${id}">
            <div class="card bg-${background} h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title text-primary">
                        <a href="${urlp}" class="text-decoration-none stretched-link">
                            <div class="d-flex align-items-center">
                                <div class="flex-shrink-0">
                                    <div class="menu-icon float-left">
                                        <i class="material-icons">${icon}</i>
                                    </div>
                                </div>
                                <div class="flex-grow-1 m-0 p-0 ms-1">
                                    ${title}
                                </div>
                            </div>
                        </a>                        
                    </h5>                    
                    <p class="card-text">
                        ${description}
                    </p>
                </div>
            </div>            
        </div>
    `;
    },
    after_render: async () => { }
};
export default WidgetCardLink;



/* <div id=${id}>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border text-${color} mt-2" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div> */
